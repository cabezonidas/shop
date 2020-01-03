import React, { ComponentProps, forwardRef } from "react";
import {
  Box,
  useTranslation,
  ErrorBoundary,
  Select,
  Option,
  Form,
  Label,
  Input,
  PrimaryButton,
  Button,
} from "@cabezonidas/shop-ui";
import {
  useAlbumsQuery,
  useCreateAlbumMutation,
  useViewAlbumQuery,
  AwsPhoto,
  useDeletePictureMutation,
} from "@cabezonidas/shop-graphql";
import { useState } from "react";
import { useEffect } from "react";

const enUsMedia = {
  welcome: "You're browsing the media app",
  selectAlbum: "Select album",
  clearSelection: "Clear selection",
  album: "Album",
  loading: "Loading",
  createAlbum: {
    title: "Create album",
    name: "Name",
    save: "Save",
    createAlbumSuccess: "Album {{album}} created.",
  },
  thumbnail: {
    delete: "Delete",
  },
};
const esArMedia = {
  welcome: "Estás navegando la aplicación de multimedios",
  selectAlbum: "Elegir album",
  clearSelection: "Limpiar selección",
  album: "Album",
  loading: "Cargando",
  createAlbum: {
    title: "Crear album",
    name: "Nombre",
    save: "Guardar",
    createAlbumSuccess: "Álbum {{album}} creado.",
  },
  thumbnail: {
    delete: "Eliminar",
  },
};

export const MediaApp = forwardRef<HTMLDivElement, ComponentProps<typeof Box>>((props, ref) => {
  const { i18n, t } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { media: enUsMedia }, true, true);
  i18n.addResourceBundle("en-AR", "translation", { media: esArMedia }, true, true);
  return (
    <ErrorBoundary {...{ i18n, t }}>
      <App {...props} ref={ref} />
    </ErrorBoundary>
  );
});

const App = forwardRef<HTMLDivElement, ComponentProps<typeof Box>>((props, ref) => {
  const { t } = useTranslation();
  const { data } = useAlbumsQuery({ fetchPolicy: "cache-and-network" });
  const [albumCollection, setAlbumCollection] = useState<string[]>([]);
  const [album, setAlbum] = useState("");

  useEffect(() => {
    if (data) {
      setAlbumCollection(data.getAlbums);
    }
  }, [data, setAlbumCollection]);

  return (
    <Box {...props} ref={ref}>
      {t("media.welcome")}
      <CreateAlbumForm
        onCreated={newAlbum => {
          setAlbumCollection(ac => [...ac, newAlbum]);
          setAlbum(newAlbum);
        }}
        pt={3}
      />
      <Box pt={3}>
        <Label>{t("media.album")}</Label>
        <Select id="album" value={album} onChange={e => setAlbum(e.target.value)}>
          <Option value="" disabled={!album}>
            {album ? t("media.clearSelection") : t("media.selectAlbum")}
          </Option>
          {albumCollection.map(o => (
            <Option key={o} value={o}>
              {o}
            </Option>
          ))}
        </Select>
      </Box>
      {album && <AlbumImageCollection album={album} pt={3} />}
    </Box>
  );
});

export default MediaApp;

const AlbumImageCollection = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Box> & { album: string }
>((props, ref) => {
  const { album, ...boxProps } = props;
  const { data, error, loading } = useViewAlbumQuery({
    variables: { albumName: album },
    fetchPolicy: "cache-and-network",
  });
  const [collection, setCollection] = useState<AwsPhoto[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      setCollection(data.viewAlbum);
    }
  }, [data, setCollection]);

  const result = (children: JSX.Element | null) => (
    <Box {...boxProps} ref={ref}>
      {children}
    </Box>
  );
  if (error) {
    return result(
      <Box display="grid" gridGap={2}>
        {error.graphQLErrors.map((e, i) => (
          <Box key={i}>{e}</Box>
        ))}
      </Box>
    );
  }
  if (loading) {
    return result(t("media.loading"));
  }
  const body = data ? (
    <Box display="grid" gridGap={2} gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))">
      {collection.map(photo => (
        <Thumbnail
          key={photo.photoUrl}
          onDeleted={deletedUrl => setCollection(c => c.filter(p => p.photoUrl !== deletedUrl))}
          {...photo}
          pt={1}
        />
      ))}
    </Box>
  ) : null;

  return result(body);
});

const Thumbnail = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Box> & AwsPhoto & { onDeleted: (photoUrl: string) => void }
>((props, ref) => {
  const { name, photoUrl, photoKey, onDeleted, ...boxProps } = props;
  const { t } = useTranslation();

  const [remove, { loading, error }] = useDeletePictureMutation({ variables: { photoKey } });

  return (
    <Box
      style={{ cursor: loading ? "wait" : "auto" }}
      {...boxProps}
      ref={ref}
      display="flex"
      flexDirection="column"
      alignContent="middle"
    >
      <Box textAlign="center">{name}</Box>
      <img src={photoUrl} width="100px" height="100px" alt={name} />
      <Button
        onClick={async () => {
          if (!loading) {
            const { data } = await remove();
            if (data && data.deletePicture) {
              onDeleted(photoUrl);
            }
          }
        }}
      >
        {t("media.thumbnail.delete")}
      </Button>
      {error && error.graphQLErrors.map((e, i) => <Box key={i}>{e}</Box>)}
    </Box>
  );
});

const CreateAlbumForm = forwardRef<
  HTMLFormElement,
  ComponentProps<typeof Form> & { onCreated: (name: string) => void }
>((props, ref) => {
  const { onCreated, ...formProps } = props;
  const { t } = useTranslation();
  const [create, { data, error, loading }] = useCreateAlbumMutation();

  return (
    <Form
      style={{ cursor: loading ? "wait" : "auto" }}
      onSubmit={async e => {
        e.preventDefault();
        if (loading) {
          return;
        }
        const textInput = (e.currentTarget.name as unknown) as HTMLInputElement;
        const albumName = textInput.value;
        const { data: res } = await create({ variables: { albumName } });
        if (res) {
          onCreated(res.createAlbum);
          textInput.value = "";
        }
      }}
      {...formProps}
      ref={ref}
    >
      <Box>{t("media.createAlbum.title")}</Box>
      <Label htmlFor="name">{t("media.createAlbum.name")}</Label>
      <Input id="name" disabled={loading} />
      <Box display="flex" justifyContent="space-between">
        <Box>
          {error && error.graphQLErrors.map((e, i) => <Box key={i}>{e.message}</Box>)}
          {data && (
            <Box>{t("media.createAlbum.createAlbumSuccess", { album: data.createAlbum })}</Box>
          )}
        </Box>
        <PrimaryButton type="submit">{t("media.createAlbum.save")}</PrimaryButton>
      </Box>
    </Form>
  );
});

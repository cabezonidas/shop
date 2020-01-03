import React, { ComponentProps, forwardRef } from "react";
import { Box, useTranslation } from "@cabezonidas/shop-ui";
import { useViewAlbumQuery, AwsPhoto } from "@cabezonidas/shop-graphql";
import { useState } from "react";
import { useEffect } from "react";
import { Thumbnail } from "./thumbnail";

export const AlbumImageCollection = forwardRef<
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
  const body = (
    <>
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
      {!collection.length && <Box>{t("media.albumCollection.empty_album")}</Box>}
    </>
  );

  return result(body);
});

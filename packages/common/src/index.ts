export const getDigits = () => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
};

interface IParticipant {
  name: string;
  phone: string;
  overseas: boolean;
  sendsOverseas: boolean;
}

export const secretSanta = (
  participants: IParticipant[]
): {
  from: IParticipant;
  to: IParticipant;
}[] => {
  try {
    const indexedParticipants = participants.map((p, i) => ({ ...p, id: i }));

    const selectedDestinations: number[] = [];
    const result: Array<{ from: IParticipant; to: IParticipant }> = [];

    const getUnselectedParticipants = (
      participants: IParticipant[],
      currentNumber: number,
      selectedDestination: number[]
    ): number => {
      const newDest = Math.floor(Math.random() * participants.length);
      if (selectedDestination.includes(newDest) || currentNumber === newDest) {
        return getUnselectedParticipants(participants, currentNumber, selectedDestination);
      } else {
        return newDest;
      }
    };

    indexedParticipants.forEach(({ id, ...p }) => {
      const to = getUnselectedParticipants(participants, id, selectedDestinations);
      selectedDestinations.push(to);
      result.push({
        from: p,
        to: participants[to],
      });
    });

    const conflicting = result.filter(
      r => (!r.from.sendsOverseas && r.to.overseas) || (r.from.overseas && !r.to.sendsOverseas)
    );

    if (conflicting.length) {
      return secretSanta(participants);
    }

    return result;
  } catch {
    return secretSanta(participants);
  }
};

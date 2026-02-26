import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Game, Show } from '../backend';

export function useGetAllGames() {
  const { actor, isFetching } = useActor();

  return useQuery<Game[]>({
    queryKey: ['games'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGames();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllShows() {
  const { actor, isFetching } = useActor();

  return useQuery<Show[]>({
    queryKey: ['shows'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllShows();
    },
    enabled: !!actor && !isFetching,
  });
}

import { useSession } from "@/hooks/useSession";
import { messageServices } from "@/services/messageService";
import { SESSION_KEYS } from "@/types/common";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const POLL_INTERVAL_MS = 5000;

export const useConversationList = () => {
  const { data: sessionData } = useSession([SESSION_KEYS.MATRI_ID]);
  const matriId = sessionData?.[SESSION_KEYS.MATRI_ID] || "";

  return useInfiniteQuery({
    queryKey: ["inbox", matriId],
    enabled: !!matriId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      messageServices.getConversationList(matriId, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data || lastPage.data.length === 0) return undefined;
      if (lastPage.continue_request === false) return undefined;
      return allPages.length + 1;
    },
    refetchInterval: POLL_INTERVAL_MS,
    refetchIntervalInBackground: false,
  });
};

export const useConversation = (otherId: string) => {
  const { data: sessionData } = useSession([
    SESSION_KEYS.USER_ID,
    SESSION_KEYS.MATRI_ID,
  ]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";
  const matriId = sessionData?.[SESSION_KEYS.MATRI_ID] || "";

  return useQuery({
    queryKey: ["conversation", matriId, otherId],
    enabled: !!memberId && !!matriId && !!otherId,
    queryFn: () => messageServices.getConversation(memberId, matriId, otherId),
    refetchInterval: POLL_INTERVAL_MS,
    refetchIntervalInBackground: false,
  });
};

export const useSendMessage = (otherId: string) => {
  const { data: sessionData } = useSession([SESSION_KEYS.MATRI_ID]);
  const matriId = sessionData?.[SESSION_KEYS.MATRI_ID] || "";
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) =>
      messageServices.sendMessage(matriId, otherId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", matriId, otherId],
      });
      queryClient.invalidateQueries({ queryKey: ["inbox", matriId] });
    },
  });
};

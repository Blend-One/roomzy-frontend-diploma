export const getRoomImageLink = (id: string) => {
  return `${import.meta.env.VITE_APP_BACKEND_URL}/api/images/rooms/${id}`;
};

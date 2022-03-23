export default function handleRoomIdGeneration() {
  let roomId = '';
  for (let i = 0; i < 6; i++) {
    roomId += Math.floor(Math.random() * 10).toString();
  }

  return roomId;
}

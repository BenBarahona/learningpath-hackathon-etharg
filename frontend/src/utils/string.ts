export const shortenAddress = (
    address: `0x${string}` | undefined,
    chars = 4,
  ) => {
    return `${address?.slice(0, chars)}...${address?.slice(-chars)}`;
  };
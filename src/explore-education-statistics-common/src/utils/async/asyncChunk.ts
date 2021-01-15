type ChunkFunction<Accumulator, Value> = (
  acc: Accumulator,
  chunk: Value[],
  chunkStart: number,
  chunkEnd: number,
) => Accumulator;

export default async function asyncChunk<Accumulator, Value>(
  items: Value[],
  chunkFunc: ChunkFunction<Accumulator, Value>,
  initial: Accumulator,
  options: {
    chunkSize: number;
  },
) {
  let promise = Promise.resolve(initial);

  let current = 0;

  while (current < items.length) {
    const chunkStart = current;
    const chunkEnd = chunkStart + options.chunkSize;

    promise = promise.then(
      acc =>
        new Promise(resolve => {
          requestAnimationFrame(() => {
            const chunk = items.slice(chunkStart, chunkEnd);

            Promise.resolve(
              chunkFunc(acc, chunk, chunkStart, chunkEnd),
            ).then(result => resolve(result));
          });
        }),
    );

    current = chunkEnd;
  }

  return promise;
}

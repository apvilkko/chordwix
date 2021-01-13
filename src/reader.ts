import { identity } from './utils'

interface IFunc<T, U> {
  (x: T): U
}

interface ReaderOutput<T, U> {
  run: (x?: T) => U
}

interface IReader<T, U> {
  (f: IFunc<T, U>): ReaderOutput<T, U>
  of: (x: T) => ReaderOutput<T, U>
  ask: () => ReaderOutput<T, U>
  ap: (f: ReaderOutput<T, U>) => (m: ReaderOutput<T, U>) => ReaderOutput<T, U>
  map: (f: IFunc<T, U>) => (m: ReaderOutput<T, U>) => ReaderOutput<T, U>
  chain: (f: IFunc<T, U>) => (m: ReaderOutput<T, U>) => ReaderOutput<T, U>
  join: (m: ReaderOutput<T, U>) => ReaderOutput<T, U>
  local: (f: IFunc<T, U>) => (m: ReaderOutput<T, U>) => ReaderOutput<T, U>
}

const Reader: IReader<any, any> = (f) => ({
  run: (x) => f(x),
})

Reader.of = (x) => Reader(() => x)
Reader.ask = () => Reader(identity)
Reader.ap = (f) => (m) => Reader((x) => f.run(x)(m.run(x)))
Reader.map = (f) => (m) => Reader((x) => f(m.run(x)))
Reader.chain = (f) => (m) => Reader((x) => f(m.run(x)).run(x))
Reader.join = (m) => Reader((x) => m.run(x).run(x))
Reader.local = (f) => (m) => Reader((x) => m.run(f(x)))

export default Reader

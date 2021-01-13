import Reader from './reader'
import { identity } from './utils'

const trim = (x: string) => x.trim()
const toEnglish = (x: string) => x.replace('H', 'B')

type ReadOutput = string

type Config = {
  inputLocale?: 'english' | 'german'
}

const read = (config?: Config) => (input: string): ReadOutput =>
  Reader.chain((x) => Reader.map(x)(Reader.map(trim)(Reader.of(input))))(
    Reader.map((c) => (c?.inputLocale === 'german' ? toEnglish : identity))(
      Reader.ask()
    )
  ).run(config)

export default read

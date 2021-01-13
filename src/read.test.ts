import read from './read'

const r = read()

describe('read', () => {
  it('trims', () => {
    expect(r(' Am ')).toEqual('Am')
  })

  it('should read parts', () => {
    expect(r('Am')).toEqual('Am')
  })

  it('works in german input locale', () => {
    expect(read({ inputLocale: 'german' })('Hm')).toEqual('Bm')
  })
})

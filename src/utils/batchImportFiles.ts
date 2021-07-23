export function useBatchImport(path: string): void {
  // const modules = import.meta.globEager(path);
  debugger
}

export function genLangs(module: Record<string, any>, exclude: string) {
  const obj: Indexable = {};

  Object.keys(module).forEach((item) => {
    const content = module[item].default;
    if (!content) {
      throw new Error('Please export default in ' + item)
    }
    let path = item.replace(/^\.\.\//, '').replace(/^\.\//, '').replace(`${exclude}/`, '').replace(/\/lang/, '');
    path = path.split('.')[0];
    const names = path.split('/')
    names.pop() as string;
    const objKey = names.join('.');
    obj[objKey] = content
    gen(content)
  });
  return obj;
}

function gen(c: any) {
  let obj: any = {}
  for (var k in c) {
    if (k.includes('.')) {
      var arr = k.split('.')
      let temp={}
      arr.reduce((item,index) => {
        obj[item] = c[k]
      })
    }
  }
  console.log(obj)
  return obj
}
class TreeNode {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.children = [];
    this.parent = null;
  }
}

const createTreeFromFlatData = (nodes) => {
  const root = new TreeNode(null, 'root');
  const cache = {};

  const getParent = (parentId) => {
    return typeof parentId === 'undefined' ? root : cache[parentId];
  }

  for (const node of nodes) {
    const { id, name } = node;
    cache[id] = new TreeNode(id, name);
  }

  for (const node of nodes) {
    const { id, parentId } = node;
    const parent = getParent(parentId);
    if (!parent) {
      console.error(`Can't find parent(id=${parentId}) of node(id=${id})`)
      return null;
    }
    const treeNode = cache[id];
    treeNode.parent = parent;
    parent.children.push(treeNode);
  }

  if (root.children.length !== 1) {
    return null;
  }

  return root.children[0];
}

console.log(createTreeFromFlatData([
  {id:1, name: 'i1'},
  {id:2, name:'i2', parentId: 1},
  {id:4, name:'i4', parentId: 3},
  {id:3, name:'i3', parentId: 2},
  {id:8, name:'i8', parentId: 3}
]));

console.log(createTreeFromFlatData([
  {id:1, name: 'i1'},
  {id:2, name:'i2', parentId: 1},
  {id:4, name:'i4', parentId: 3},
  {id:3, name:'i3', parentId: 2},
  {id:8, name:'i8', parentId: 7}
]));

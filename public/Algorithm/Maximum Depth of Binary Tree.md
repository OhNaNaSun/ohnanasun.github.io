## Description

> Given a binary tree, find its maximum depth.
> The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

## Solution: Make life easier

```
var maxDepth = function(root) {
    if(!root) return 0
    var depth = root ? 1 : 0
    var maxLeft = root.left ? maxDepth(root.left) : 0
    var maxRight = root.right ? maxDepth(root.right) : 0
    return depth + Math.max(maxLeft, maxRight)
};
```

**====>**

```
var maxDepth = function(root) {
    if(!root) return 0
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
};
```

**====>**

```
var maxDepth = function(root) {
    return !root ? 0 : 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
};
```

Make life easier！💅

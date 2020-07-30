[Why is the space complexity of a recursive inorder traversal O(h) and not O(n)](https://stackoverflow.com/questions/41201908/why-is-the-space-complexity-of-a-recursive-inorder-traversal-oh-and-not-on)

[Space complexity of recursive function](https://stackoverflow.com/questions/43298938/space-complexity-of-recursive-function)

```
int f(int n) {
  if (n <= 1) {
    return 1;
  }
  return f(n - 1) + f(n - 1);
}
```

- Time complexity: O(2^N)
- Space complexity: O(N)

> **Explanation:**
> Our memory complexity is determined by the number of return statements because each function call will be stored on the program stack. To generalize, a recursive function's memory complexity is O(recursion depth). As our tree depth suggests, we will have n total return statements and thus the memory complexity is O(n).

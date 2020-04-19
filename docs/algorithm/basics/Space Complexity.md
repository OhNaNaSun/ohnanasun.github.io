[How to calculate the space complexity of function?](https://stackoverflow.com/questions/30220305/how-to-calculate-the-space-complexity-of-function)
: Space complexity includes both Auxiliary space and space used by input.But many use the term to just mean auxiliary space complexity.

When we talk about space complexity, we don't consider the space used by the input.

This allows us to talk about algorithms which are constant space, O(log n) space etc. If we started counting the input, then all algorithms will be at least linear space!

The standard multi-tape Turing machine definition of space complexity also does not count the output.

The input is read only and output is write only and do not count towards the space complexity.

So to answer your question: look for what memory your method allocates, including stack space for recursion/local variables etc, and that will determine the space complexity.
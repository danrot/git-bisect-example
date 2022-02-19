# `git bisect` example

In this repository a small JavaScript calculation console application is used to explain how `git bisect` works. The
application can be executed with the following command:

```
node index.js
```

The program asks for the first operand of a calculation, then for the operator to execute and at the end for the second
operand. After all information has been given the result of this operation is displayed.

```
$ node index.js
First operator: 5
Operator: *
Second operator: 3
15
```

However, the application contains a bug: It subtracts two number for the addition operation.

```
$ node index.js
First operator: 5
Operator: +
Second operator: 3
2
```

The addition was working as expected in the previous commit d3c66b49c330e58a70fe0abda56b691e1bb5db75. So the bug must
have been introduced in between the current commit and that working commit. The bug in this application is quite easy
to find, so using `git bisect` is not absolutely necessary, but imagine that the bug is not that obvious and much
harder to find. In such a case it helps to limit the amount of code a developer needs to look at. Using `git bisect` it
is very easy to find the commit that introduced that error in a few steps, as it implements a binary search resulting
in a logarithmic complexity.

This is done by executing the following steps, assuming the latest commit of this repository is checked out:

1. Start the search with `git bisect start`.
2. Tell git that the current commit contains the error by executing `git bisect bad`.
3. Switch to the latest commit known to not contain that bug by executing
`git switch -d d3c66b49c330e58a70fe0abda56b691e1bb5db75`.
4. Execute the program using `node index.js` and double check that the plus operator works in this commit.
5. Mark the commit as working by executing `git bisect good`.
6. The commit in the midst of the working and non-working commit is checked out.
7. Execute `node index.js` and check if the error still exists. Type `git bisect bad` if the bug is still there and
`git bisect good` if the application is now working as expected. Repeat until git presents the commit containing the
error.
8. Execute `git bisect reset` to get back to the commit that was checked out before `git bisect start` was executed.

Step 7 will show that commit 124439abe0fb289109f915dcdd07f1ecb0041f79 introduced the problem. It can be displayed by
executing `git show 124439abe0fb289109f915dcdd07f1ecb0041f79`. It just inserts two lines, so it is a lot easier to find
the reason for that error. In this case the reason for the error is that a `break` was missing after the execution of
the addition.

**Mind that this only works if all commits are working and there are no "work-in-progress" commits in which the
applicatin is not running at all. Also, it is a lot more useful if the commits in the repository are not too big,
because the smaller the found commit is, the easier it is to locate the error.**

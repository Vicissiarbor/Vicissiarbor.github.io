
---
title: "MATLAB Note"
date: 2026-01-17
categories: ["MATLAB"]
tags: ["技术", "笔记"]
draft: false
math: true  # 开启LaTeX支持
---

# First
## simple 
### function
| key function  | function                                | other                                                                                           |
| ------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| clc           | clear order line                        | no                                                                                              |
| diary         | record text of order line in diart text | use `get(0,'Diary')` to get modol now ; use `get aname`to record diary in a text mane of aname. |
| type          | show text                               | only `.m` `.mlx` `.mlapp` can be open normally.                                                 |
| format(style) | set output format                       | specific format will be statistics on other times                                               |
| home          | move cursor                             | and swipe screen without delete orders                                                          |
| iskeyword     | judge is input key word                 | return 1 as true and 0 as false                                                                 |
| more          | paging output                           | maby have no using and i do't learn it now                                                      |
| namelengthmax | return constant                         | max length of variable name                                                                     |
| exist name    | check is name exist now                 | return number as [symple](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/exist.html)  |
### multi-line
use `...` as blank between two line , andyou can't use it to break quotation mark`""`/`''`.
### variable name
- bagin with word and follow with word,number or `_`.
- MATLAB case sensitive.
- you can't use keywords.
- ues `exist` or `which` to cheak is the name be used.
### case sensitive but blank
MATLAB don't case blank but in defining array.
### calculate
- plus , `+`,make c = a + b.
  - A = A + 2 , means each elements of a plus 2.
  - strings plus means that next string follow the first string.
  - row vector + colmun vector means :$a=[a_1,a_2],b=[b_1,b_2,b_3]^T$,so a + b =$$\begin{bmatrix}a_1+b_1&a_2+b_1\\a_1+b_2&a_2+b_2\\a_1+b_3&a_2+b_3\end{bmatrix}$$
- `sum` return sum of elements of A's first no-zero dimensionality . sum column in 2D matrix.
- `cumsum` return sum to every elements and all elements before thenselves,don't change the dimensionalities of input. 
- `movsum(A,k)` return sum of near k elements ,movsum see this element as center if k is odd , but see prior element as center if k is even.
  -`movsum(A,[a b])` return sum of a elements before and b elements  last and this elements.
- minus,`-`, like plus.
- `diff` reutrn next elements minus this elements and the length of this dimensionality minus one.
- times,`.*`,make correct elements times and has similar rules with plus.
- mtimes,`*`,times of matrix.
- `prod` , is similar to sum but operator is times.
- `cumprod`, is similar to cumsum but operator is times.
- `pagemtimes` make every page( *dimensionality over 2* ) mtimes to a new matrix.
- rdivide,`./`,division like `.*`.
- ldivide,`.\`,use left element to divide right element , A.\B=B./A. 
- mrdivide,`/`,use x = B/A to fide x of $xA = B$.
- mldivide,`\`,use x = A\B to find x of $Ax=B$.
  - `/`and`\`has this relation follow:$B/A = (A'\backslash B')'$ .
  - if a is square matrix , MATLAB use better method to get answer than inv(A)*B.
  - [detail arithmetics](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/double.mldivide.html)
- `pagemldivide` and `pagemrdivide` to get solution on every page.
- power , `.^` used to get power for every element.
- mpower , `^` is power of matrix.
- transpose,`.'` transpose matrix but imaginary parts.
  - and ctranspose , `'` transpose matrix and comjugate its elements.
- `pagetranspose` and `pagectranspose`.
- `mod`, b = mod(a,m) means $b\equiv a \mod m$ and if m = 0,b = a.
- `rem` is also get mod .
  - `rem`'s result has the same sign as a but `mod`'s result has the same sign as b.
- `idivide(a,b,opt)`,a divide b and get integer.opt can be `fix` `floor` `ceil` `round`.
  - `ceil`round to positive infinity.
  - `fix` round to zero.
  - `floor` round to negative infinity.
  - `round` round to nearest integer.
### relation comparation
- eq,`==`,check if two elements are equation.it can be use to find char in char array.
  - `>=` `<=` `>` `<`is easy . and `~=` is opposite with `==`.
- `isapprox` to check equation with some small errors.[isapprox](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/isapprox.html)

## use function
MATLAB has many function to calculate.
### grammer
this two sentences is equivalent:
```matlab
load name.mat    %Command syntax
load('name.mat') %Function syntax
```
therefore some function delivery value correct is like :
```matlab
open(filename)
```

when function output:
```matlab
[output1,...,outputM] = function(input1,...,inputN)
```
### matrix
| key function                | function                                     | other                                                                                                | more                                                                                                                                                                                                                                                       |
| --------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| zeros                       | create array with all zero                   | `zeros(n)`means create a $n\times n$ matrix ; and zeros(sz1,...,szN)create a N-dimensionality mitrix | it is decided by  kind of para. [zeros](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/zeros.html)                                                                                                                                               |
| ones                        | create array with all one.                   | like zeros.                                                                                          | like zeros too.                                                                                                                                                                                                                                            |
| rand                        | create array with random numbers from 0 to 1 | with .4 numbers,and can calculate it to any range.                                                   | like zeros. [rand](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/double.rand.html)                                                                                                                                                              |
| true                        | 1 in logical                                 | can be used like zeros.                                                                              | false is 0 in logical.                                                                                                                                                                                                                                     |
| eye                         | create unit matrix                           | matrix without square have unit matrix too.                                                          | like zeros.                                                                                                                                                                                                                                                |
| diag                        | deal with value in diagonal                  | diag(v,k) to create diagonal matrix ; and diag(A,k) to get value of A's diagonal.                    | trace(A)=sum(diag(A)).[diag](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/diag.html)                                                                                                                                                           |
| blkdiag(A1,A2,A3)           | create block diagnoal matrix                 | new matrix'diagnoal is A1,A2,A3,and adapt orders automatically                                       |                                                                                                                                                                                                                                                            |
| cat(dim,A,B)                | concatenated matrix in dim-dimensionality    | it means B's dim-dimensionality now follow by A.                                                     | horzcat(A,B)=cat(2,A,B),and vertcat(A,B)=cat(1,A,B).    [cat](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/double.cat.html)                                                                                                                    |
| repelem,repmat,combinations |                                              |                                                                                                      | [repelem](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/repelem.html),[repmat](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/repmat.html),[combinations](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/combinations.html) |
### create grid
| key function         | function                                                                        | others                                                                                                                                                    | more                                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| linspace(a,b,n)      | create n points between a and b                                                 | the destance of points are same,and n = 100 without n in value.                                                                                           | it can use complex. [linspace](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/double.linspace.html)                                        |
| logspace(a,b,n)      | create n pionts between $10^a$and$10^b$                                         | the destance between n are same and the value of points is $10^n$                                                                                         | logspace(a,pi,n)'s creations is betweem $10^a$ and $\pi$.$\textcolor{red}{This\ is\ often\ uesd\ in\ dealing\ singels.}$                             |
| [f1,f2]=freqspace(n) | only create two row vector                                                      | [f1,f2]=freqspace(n,'meshgrid') can make f1 a matrix where each row repeats the row vector and make f2 a matrix where each column repeats the row vector. | [it is so difficult to understand!](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/freqspace.html#mw_3f58bcc5-c4c4-4340-9c7e-561e00a1d0de) |
| [X,Y]meshgrid(x,y)   | X is repeats of x to length(y) rows and Y is repeats of y to length(x) columns. | x and y must are vector.                                                                                                                                  | it can be used to create 2D/3D grid.                                                                                                                 |
| ndgrid               | X is repeats of x to length(y) columns and Y is repeats of y to length(x) rows. | you can use pagetranspose to get ndgrid from meshgrid.                                                                                                    | meshgrid is more often to be used in drawing.                                                                                                        |
### about value of matrix
| key function        | function                                                 | others                                                                                                  |
| ------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| length(x)           | return max length of x's row and column.                 | it can be used in [tall](https://ww2.mathworks.cn/help/releases/R2025a/matlab/tall-arrays.html) arrays. |
| size(A)             | check size of A                                          | use size(A,n) to check A's number n dimensionality.                                                     |
| ndims(A)            | check A's dimensionality                                 | ans >= 2,because is see 1D array as 2D.                                                                 |
| numel(A)            | get number of A'elements                                 | numel('abc')=3 but numel("abc")=1.                                                                      |
| isscalar            | check is input scalar                                    | isvector,ismatrix,isrow,iscolumn,isempty,issorted,issortedrow,isuniform                                 |
| head(A,k)           | get first k lines of A ,and get first 8 lines without k. | it is also used in block.                                                                               |
| tail(A,k)           | get last k lines of A ,and get last 8 lines without k.   | it is same to head.                                                                                     |
| resize(A,n)         | add 0 or delete extra data to make size of A'row be n.   | it don't exchange A and need B to get the return.Kimi tell me that resize can add value in matrix.      |
| paddata             | pad data by adding elements.                             |                                                                                                         |
| trimdata            | trim data by removing elements.                          | [trimdata](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/trimdata.html)                      |
| permute(A,[3,2,1])  | transposition A on dimensionality of 3,2,1.              |                                                                                                         |
| ipermute(B,[3,2,1]) | A = ipermute(B,dim)make B = permute(A,dim)               |                                                                                                         |
| shiftdim(A,n)       | move A'dim left n columns                                | n can be minus and it will add 1 on left.                                                               |
| reshape             | arrange now elemeents to new dimensionaliyt.             |                                                                                                         |
| squeeze             | delete dimensionalities with size one.                   |                                                                                                         |
### sort
| key function | function                             | others                                                                                     |
| ------------ | ------------------------------------ | ------------------------------------------------------------------------------------------ |
| sort(A,dim)  | sort A from big to small on dim-D.   | [sortrows](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/double.sortrows.html)  |
| flip         | overturn elements.                   | [flip](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/flip.html) is too complex. |
| fliplr       | overturn matrix left and right.      |                                                                                            |
| flipud       | overturn matrix up and down.         |                                                                                            |
| rot90        | turn matrix $90^。$ anticlockwisely. |                                                                                            |
| transpose    | transpose                            |                                                                                            |
| circshift    | move array as a circle.              |                                                                                            |
### index

- colon`:` create vector , array-subscript and for range.   
  - x = j:k means x = [j,j+1,...,k]
  - x = j:i:k means x = [j,j+i,j+2i,...,k]
  - A(i,j) i and j is A's subscript,use `:` as all subscript of A,like A(:,k)
- end `end` to finish `for,while,switch,try,if,parfor`and functions.
- `ind2sub` to turn linear-script to subscript.[ind2sub](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/ind2sub.html)
- `sub2ind` to turn subscript to linear-script.[sub2ind](https://ww2.mathworks.cn/help/releases/R2025a/matlab/ref/sub2ind.html)
## convenient usage
### collect order
[i won't learn it in near future](https://ww2.mathworks.cn/help/releases/R2025a/matlab/matlab_env/create-matlab-favorites-to-rerun-commands.html)


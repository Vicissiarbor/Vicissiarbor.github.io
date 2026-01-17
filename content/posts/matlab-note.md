
---
title: "MATLAB Note"
date: 2026-01-17
categories: ["MATLAB"]
tags: ["技术", "笔记"]
draft: false
math: true  # 开启LaTeX支持
---

# matlab note
## simple 
###
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
### create 
## convenient usage
### collect order
[i won't learn it in near future](https://ww2.mathworks.cn/help/releases/R2025a/matlab/matlab_env/create-matlab-favorites-to-rerun-commands.html)


>Say you have an array for which the ith element is the price of a given stock on day i.
If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.
Note that you cannot sell a stock before you buy one.

```
var maxProfit = function(prices) {
    var max = 0
    for (var i = 0; i<prices.length;i++){
        // make it much faster
        if(prices[i+1] <= prices[i]){
            continue
        }
        for(var j = i+1; j < prices.length;j++){
            var del = prices[j] - prices[i]
            if(del > max) {
                max = del
            }
        }
    }
    return max
};
```
* Time complexity : O(n^2)
* Space complexity : O(1)
```
var maxProfit = function(prices) {
    var profit = 0
    var min = Number.MAX_SAFE_INTEGER;
    for (var i = 0; i<prices.length;i++){
        if(prices[i] < min){
            min = prices[i]
        } else if(prices[i] - min > profit) {
             profit = prices[i] - min     
        }
    }
    return profit
};
```
* Time complexity : O(n)
* Space complexity : O(1)
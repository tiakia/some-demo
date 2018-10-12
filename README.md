# some-demo
一些 小 demo 整合起来发到一起吧

#### lazyImg

图片懒加载的 demo
- 可以监听 scroll 事件 比较 `ele.getBoundingClientRect().top` 和 `document.documentElement.clientHeight`
- 可以使用 IntersectionObserver 观察 元素是否进入可视窗口

#### sortDemo

排序算法的demo

#### throttle

函数的节流和 防抖的 demo
详细的分析 可以[查看我博客](http://www.tiankai.party/%E5%87%BD%E6%95%B0%E7%9A%84%E9%98%B2%E6%8A%96%E5%92%8C%E8%8A%82%E6%B5%81.html)

#### canvasDemo

canvas 的 `getImageDate` 函数 获取图片的 rgba 的 值 并且改变 rgba 达到图片蒙版的效果

做了三个效果：

- 鼠标滑过 显示 该处的 rgba 的值
- 图片蒙版，每隔 3px 改变一下rgba的值
- 图片颗粒化, 每隔 6px 获取一个像素点，然后 在利用canvas 把这些点 每个半径 3px 画出来就有了 图片的 颗粒化

这个是参考[大神](https://juejin.im/post/57dd27ba2e958a005462e9ae)，和我[朋友](https://segmentfault.com/a/1190000016436206)做的,可以去看看原版，颗粒化那块难的是动画的制作，想钻研的朋友还是建议去看看他俩的作品。

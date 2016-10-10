<style scoped>
.loading {
  position: relative;
  margin-top: 100px;
  font: 16px "Times New Roman",Times,serif;
  color: #4a8532;
  text-shadow: 0 1px 0 #eee;
  text-align: center;
}

.seperator {
  margin: 0 auto;
  padding: 15px 0;
  width: 180px;
  height: 12px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAMCAYAAAApiIxTAAAEWUlEQVR42u2YX0hbVxzHb9K0MX9abU3SxCTmJiZqpCZLRw1U5kpXhYoozjIcdh1zTkKqI1spbrVdrNhSu4durazsUUF89l30wRf/gCL65oP/HvyD4P//ivseOBmXQ2JiBns6P/iQe+/ve88l53zPub97BB4JhxxcAoozNBcpsvhtQBM/LgDo0SaPqHF6evovPOKHAhhUKpUlNzdXTElJseM8E6RRc8rosdlut9uQF3FM0EuMrwEm5DLp/YBqGKPS9lKBhegk2EA6kAs8uJmTCKXf77dsbGw8QmeFCScnJ3/Mzc3V5+XlOYk5tVqtfmZm5g5yzeAF8u+mp6fr3G63ixpbPzg46MX1p8i/Bh9WVlaaWltb/cSk1NxXIhNHrVZndHZ2+lZXVx8fHx+/h/5v3PtxfX39WVdXlx+TyspXam7m84aiurpahKHq0VF6SeddALcODg5etrW1FVgsFmd3d7dDkleAO3t7e63hcLiAGLa9vd09MDCgoHkZuAGDNo+Pj9colUoH0YD04uLijMPDwx+RfwBcQCV5pg3UrK2tNfp8PhtfobmZE47y8nJirG+IOWN0Yur+/v6TQCDgo2a8yuTTj46OmiKG1ul0JmJAgsSgFbOzs8GIoUdGRr7ANU2cwXNsbW0FSkpKDAIPxszoXKCKgSYKl5MgDVxLAh2DHhjiYEwAE8iQYAZWKYgsUkZIrtkk2P8nROa5mcBqNBrFrKwsJzlmMDP/y5gAhjjo2XFIcixTk/CNlvXfGV6VE0ergTsGN8GnDJ8lQSn48pxUgYcM34H6ODSCUByegGcSfgOvpAwNDT1ArfwTPX8N3kn4SGvZD1h9/1xYWGggqyuBHJNrUtBOS1FRkZsYtL+/vwIr+ltWMzU19S3J4yMzG/Xyr2j7LzzjPfPcdvAK+peTk5MPyTHDc+Z/hRIgEKc/v48yDlVJjOe9JHxzK4r/8mJ4VS3wiB47OzsVHo/HTmd9rFeccmJiQtPb2+tZXl5+Cn0O+aArKyvTkc6VIKK9F6FQ6CZuI3nz0tKShtGUkong9XqzDQaDA5qYg+N0OvXb29v3BB68Zk6wky6jNm3Mz8930FfrJUaSAnRms9mCj7LPofdgx+GX2tpaLy0RjNJ7kDfB8IHKysobJE92JdiJsri4WNDX11cWDAY/obscaUDG7FNfg+4+2rsi8OBmPkdHXccr/XlPT89tai4RWIHocrkcw8PDd1EO/AzdVap3QN8yOjpaXVhYmENNbY3U6B0dHdnQv5mfn39cV1fnoXkLuE402D2xYhekBm2Ex8bGvibbf7RWNhJsNptpc3OznKz0Ag9u5iQ6SwNqyP4yVt5m7BE3oGSI1Kh3gZzRq0AV9L9jZW9B/duAX1KXNoFScBHcBm27u7tvkA9iZX8EPanjvwJaoAQV4C3M3YJ8LXZWSBs/AJ3Ag5v5vwQ1oQhygT4BvQJkghxgBLIoGgPNW4E8Sl4GdDSvEXicaeZ/AFPst80Hc0xqAAAAAElFTkSuQmCC) no-repeat center center
}

.dots {
  display: inline-block;
  position: absolute;
  width: 30px;
  text-align: left
}

.tips {
  color: #909090
}

.ani-dot {
  overflow: hidden;
  animation: dot 1.5s infinite step-start;
}

@keyframes dot {
    0% { width: 0 }
    33% { width: 4px }
    66% { width: 8px }
    100% { width: 12px }
}
</style>

<template>
  <div class="loading">
    Preparing the sources
    <span class="dots ani-dot">...</span>
    <div class="seperator"></div>
    <span class="tips">It will be just as you left it</span>
  </div>
</template>

<script>
export default {}
</script>

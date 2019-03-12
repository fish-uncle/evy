import {alert as alert0, toast as toast0, loading, actionsheet} from 'iakit';
import '../lib/iakit.h5.css';

function toast(...param) {
  toast0.showTop(...param);
}

function alert(...params) {
  if (params.length === 1) {
    alert0(params[0], '');
  } else {
    params[0] = params[0] || ' ';
    alert0(...params);
  }
}

/**
 * 函数防抖
 * */
function debounce(fn, wait) {
  let tiemr;


  return function(...params) {
    clearTimeout(tiemr);
    tiemr = setTimeout(fn.bind(this, ...params), wait);
  };
}

/**
 * 函数节流
 * */
function throttle(fn, wait) {
  let timer;
  let lastTriggerTime = 0;
  return function(...params) {
    const that = this;
    const now = new Date().getTime();
    if (now >= wait + lastTriggerTime) {
      fn.call(that, ...params);
      lastTriggerTime = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.call(that, ...params);
        lastTriggerTime = new Date().getTime();
      }, wait + lastTriggerTime - now);
    }
  };
}

/**
 * 将以分为单位的钱转为以元为单位 999 ->9.99  2000 -> 20.00 50 -> 0.50
 * @param num string/number
 * */
function formatMoney(num) {
  if (!num) return '0.00';
  num = String(num);
  if (/[^\-0-9.]/.test(num)) {
    console.warn(`formatMoney函数参数错误，${num}`);
    return num;
  }

  let res = parseInt(num) / 100;
  res = res.toFixed(2);
  return res;
}


export {alert, toast, loading, actionsheet, throttle, debounce, formatMoney};
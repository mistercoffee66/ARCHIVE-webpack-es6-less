import Modernizr from '../_lib/modernizr-custom'
import _throttle from 'lodash.throttle'

export const viewport = () => {

  if (Modernizr.mq('(min-width: 1024px)')) {
    return 'desktop'
  }
  else if (Modernizr.mq('(min-width: 800px)')) {
    return 'medium'
  }
  else if (Modernizr.mq('(min-width: 550px)')) {
    return 'medium'
  }
  else {
    return 'mobile'
  }
};

export const throttle = (selector, evt, cb, t = 100) => {
  const nodes = document.querySelectorAll(selector)
  for (let node of nodes) {
    node.addEventListener(evt, _throttle(cb, t))
  }
}

export const deThrottle = (selector, evt, cb, t = 100) => {
  const nodes = document.querySelectorAll(selector)
  for (let node of nodes) {
    node.removeEventListener(evt, _throttle(cb, t))
  }
}
import { SCROLL_OFFSET } from '../../constants';

export class scrollService {
  static isPageEnd() {
    const {
      documentElement: { scrollTop, offsetHeight },
    } = document;
    return (
      Math.abs(window.innerHeight + scrollTop - offsetHeight) < SCROLL_OFFSET
    );
  }
}

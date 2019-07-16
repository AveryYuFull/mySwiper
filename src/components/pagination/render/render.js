import callFn from '../../../utils/callFn';
import getElements from '../../../utils/getElements';
/**
 * 渲染
 */
export default function render () {
    const _that = this;
    const _params = _that.params || {};
    const _pParams = _params.pagination || {};
    const _pagination = _that.pagination || {};
    if (!_pParams.el || !_pagination.$el || _pagination.$el.length <= 0 ||
        !_pagination.el) {
        return;
    }
    const _type = (_pParams.type || '') + '';
    let _htmlText = '';
    switch (_type) {
        case 'bullets':
            const _snapGrid = _that.snapGrid || [];
            for (let i = 0; i < _snapGrid.length; i++) {
                let _html;
                if (_pParams.renderBullet instanceof Function) {
                    _html = callFn(_pParams.renderBullet, [i, _pParams.bulletClass]);
                } else {
                    _html = `<${_pParams.bulletElement} class="${_pParams.bulletClass}"></${_pParams.bulletElement}>`;
                }
                _htmlText += _html;
            }
            break;
        case 'progressbar':
            if (_pParams.renderProgressbar instanceof Function) {
                _htmlText = callFn(_pParams.renderProgressbar, [_pParams.progressbarFillClass]);
            } else {
                _htmlText = `<span class="${_pParams.progressbarFillClass}"></span>`;
            }
            break;
        case 'fraction':
            if (_pParams.renderFraction instanceof Function) {
                _htmlText = callFn(_pParams.renderFraction, [_pParams.currentClass, _pParams.totalClass]);
            } else {
                const _curHtml = `<span class="${_pParams.currentClass}"></span>`;
                const _totalHtml = `<span class="${_pParams.totalClass}"></span>`;
                _htmlText = _curHtml + '/' + _totalHtml;
            }
            break;
    }
    _pagination.el.innerHTML = _htmlText;
    if (_type === 'bullets') {
        _pagination.bullets = getElements(`.${_pParams.bulletClass}`, _pagination.el);
    }
}
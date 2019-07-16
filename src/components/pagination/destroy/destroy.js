/**
 * 销毁
 */
export default function destroy () {
    const _that = this;
    const _pParams = _that.params.pagination;
    const _pagination = _that.pagination;
    if (!_pParams.el || !_pagination.$el || _pagination.$el.length <= 0 ||
        !_pagination.el) {
        return;
    }
    if (_pParams.clickable) {
        _pagination.el.removeEventListener('click', _pagination._onClick);
    }
}

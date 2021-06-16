class S {
    constructor(param) {
        if (param instanceof Element || param instanceof HTMLDocument) {
            this.selector = [param]
        } else {
            this.selector = document.body.querySelectorAll(param)
        }
        this[0] = this.get()
        return this
    }
    get(attr = null) {
        if (attr) {
            return this.selector.length === 1 ? this.selector[0][attr] : this.selector[attr]
        }
        return this.selector.length === 1 ? this.selector[0] : this.selector
    }
    setDomAttr(attr, param) {
        if (attr && (param === false || param === true || param)) {
            this.selector.forEach((e, i) => {
                e.setAttribute(attr, param)
            })
            return this
        }

        let e = this.get()
        return e instanceof Element || e instanceof HTMLDocument ? e.getAttribute(attr) : e
    }
    html(param) {
        return param ? this[0].innerHTML = param : this[0].outerText
    }
    attr(attr, param) {
        return this.setDomAttr(attr, param)
    }
    data(attr, param) {
        return this.setDomAttr('data-'+attr, param)
    }
    val(param) {
        return this.setDomAttr('value', param)
    }
    // Events
    event(type, callback) {
        this.selector.forEach(function(e, i) {
            e.addEventListener(type, callback)
        })
    }
    click(callback) {
        this.event('click', callback)
    }
    hover(callback) {
        this.event('mouseenter', callback)
    }
    blur(callback) {
        this.event('blur', callback)
    }
    // CSS
    hide() {
        return this[0].style.visibility = 'hidden'
    }
    show() {
        return this[0].style.visibility = 'visible'
    }
}

var _old = S
S = function(...args) { return new _old(...args) }


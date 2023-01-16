/**
 * Created by Shoom on 07.05.15.
 */

/**
 * Сцена
 * @param {Object} params параметры сцены
 * */
var Scene = function (params) {
    var th = this;

    //события сцены
    this._events = {
        'keydown': [],
        'keyup': []
    };

    //уровень
    this.level = null;
    //смещение сцены по X
    this.offsetX = 0;
    //смещение сцены по Y
    this.offsetY = 0;

    //2D контекст
    this.domRoot = document.getElementById(params.canvas)
    this.ctx = this.domRoot.getContext('2d', { alpha: false });
    this.ctx.canvas.width = params.view.width;
    this.ctx.canvas.height = params.view.height;

    //Высота сцены
    this.height = this.ctx.canvas.height;
    //Ширина сцены
    this.width = this.ctx.canvas.width;

    /**
     * Биндинг события
     * @param {String} event название события
     * @param {Function} func callback события
     * */
    this.on = function (event, func) {
        this._events[event].push(func);
        return this;
    };

    /**
     * Удаление бинда события
     * @param {String} event название события
     * @param {Function} func callback события
     * */
    this.off = function (event, func) {
        this._events[event].remove(func);
        return this;
    };

    /**
     * Очистка сцены
     * */
    this.clear = function () {
        this.ctx.clearRect(0, 0, this.width + this.offsetX, this.height + this.offsetY);
    };

    /**
     * Центрирование карты относительно объекта
     * */
    this.mapCenter = function (obj) {
        if (this.level) {
            var offsetX = obj.x + (obj.width / 2) - this.width / 2;
            var offsetY = obj.y + (obj.height / 2) - this.height / 2;

            if (offsetX < 0) offsetX = 0;
            if (offsetX > this.level.width - this.width) offsetX = this.level.width - this.width;

            if (offsetY < 0) offsetY = 0;
            if (offsetY > this.level.height - this.height) offsetY = this.level.height - this.height;

            this.offsetX = offsetX;
            this.offsetY = offsetY;

            this.ctx.translate(-this.offsetX, -this.offsetY);
        }
    };

    /**
     * Установка уровня
     * @param {Level} level уровень
     * */
    this.setLevel = function (level) {
        this.level = level;
        this.level.scene = this;
        this.level.ctx = this.ctx;
    };

    this.listenEvents = function () {
        let isSceneFocused = false

        this.domRoot.addEventListener('mouseenter', () => {
            isSceneFocused = true
        })

        this.domRoot.addEventListener('mouseleave', () => {
            isSceneFocused = false
        })

        window.addEventListener('keydown', function (e) {
            if (isSceneFocused) {
                e.preventDefault();
            }

            for (var i = 0; i < th._events.keydown.length; i++) {
                th._events.keydown[i](e.keyCode, e);
            }
        });

        window.addEventListener('keyup', function (e) {
            for (var i = 0; i < th._events.keyup.length; i++) {
                th._events.keyup[i](e.keyCode, e);
            }
        });
    }

    this.listenEvents();
};

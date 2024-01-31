!function(e) {
    function t(n) {
        if (o[n])
            return o[n].exports;
        var r = o[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(r.exports, r, r.exports, t),
        r.l = !0,
        r.exports
    }
    var o = {};
    return t.m = e,
    t.c = o,
    t.i = function(e) {
        return e
    }
    ,
    t.d = function(e, t, o) {
        Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: o
        })
    }
    ,
    t.n = function(e) {
        var o = e && e.__esModule ? function() {
            return e["default"]
        }
        : function() {
            return e
        }
        ;
        return t.d(o, "a", o),
        o
    }
    ,
    t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    t.p = "",
    t(t.s = 0)
}([function(e, t) {
    function o(e, t, o, n) {
        var r = document.getElementById(e)
          , i = Filters.filterImage(t, n, o);
        r.width = i.width,
        r.height = i.height;
        var c = r.getContext("2d");
        c.putImageData(i, 0, 0)
    }
    function n(e) {
        var t = e.target.files
          , o = t[0];
        if (o.type.match("image.*")) {
            var n = new FileReader;
            n.onload = function(e) {
                return function(e) {
                    image.src = e.target.result,
                    cropper.destroy(),
                    cropper = new Cropper(image,options),
                    $("#submit").prop("disabled", !1)
                }
            }(o),
            n.readAsDataURL(o)
        }
    }
    window.File && window.FileReader && window.FileList && window.Blob || alert("Las API de archivo no estan completamente soportadas en este navegador."),
    Filters = {},
    Filters.getPixels = function(e) {
        var t = e.getContext("2d");
        return t.getImageData(0, 0, e.width, e.height)
    }
    ,
    Filters.getCanvas = function(e, t) {
        var o = document.createElement("canvas");
        return o.width = e,
        o.height = t,
        o
    }
    ,
    Filters.filterImage = function(e, t, o) {
        for (var n = arguments, r = [this.getPixels(t)], i = 2; i < arguments.length; i++)
            r.push(n[i]);
        return e.apply(null, r)
    }
    ,
    Filters.grayscale = function(e, t) {
        for (var o = e.data, n = 0; n < o.length; n += 4) {
            var r = o[n]
              , i = o[n + 1]
              , c = o[n + 2]
              , a = .2126 * r + .7152 * i + .0722 * c;
            o[n] = o[n + 1] = o[n + 2] = a
        }
        return e
    }
    ,
    grayscale = function(e) {
        o("c", Filters.grayscale, 0, e)
    }
    ,
    brightness = function() {
        o("brightness", Filters.brightness, 40)
    }
    ,
    window.onload = function() {
        image = document.getElementById("foto"),
        options = {
            aspectRatio: aspectRatio,
            preview: ".img-preview",
            ready: function(e) {
                console.log(e.type)
            },
            cropstart: function(e) {
                console.log(e.type, e.detail.action)
            },
            cropmove: function(e) {
                console.log(e.type, e.detail.action)
            },
            cropend: function(e) {
                console.log(e.type, e.detail.action)
            },
            crop: function(e) {
                var t = this.cropper
                  , o = {
                    width: widthCropped,
                    height: heightCropped,
                    fillColor: "transparent"
                }
                  , n = t.getCroppedCanvas(o);
                $("#image_base_64").val(n.toDataURL("image/png")),
                $("#demo").attr("src", n.toDataURL("image/png")),
                $("#resultado").attr("href", n.toDataURL("image/png"))
            },
            zoom: function(e) {
                console.log(e.type, e.detail.ratio)
            }
        },
        $("#file").on("change", n),
        cropper = new Cropper(image,options),
        $("#btn-open-file").on("click", function() {
            $("#file").trigger("click")
        }),
        $("#btn-move").on("click", function() {
            cropper.setDragMode("move")
        }),
        $("#btn-crop").on("click", function() {
            cropper.setDragMode("crop")
        }),
        $("#btn-zoom-plus").on("click", function() {
            cropper.zoom(zoomStep)
        }),
        $("#btn-zoom-minus").on("click", function() {
            cropper.zoom(zoomStep * -1)
        }),
        $("#btn-move-left").on("click", function() {
            cropper.move(moveStep * -1, 0)
        }),
        $("#btn-move-right").on("click", function() {
            cropper.move(moveStep, 0)
        }),
        $("#btn-move-up").on("click", function() {
            cropper.move(0, moveStep * -1)
        }),
        $("#btn-move-down").on("click", function() {
            cropper.move(0, moveStep)
        }),
        $("#btn-rotate-left").on("click", function() {
            cropper.rotate(rotateStep * -1)
        }),
        $("#btn-rotate-right").on("click", function() {
            cropper.rotate(rotateStep)
        }),
        $("#btn-lock").on("click", function() {
            cropper.disable()
        }),
        $("#btn-unlock").on("click", function() {
            cropper.enable()
        }),
        $("#btn-reset").on("click", function() {
            cropper.reset()
        }),
        $('[data-toggle="tooltip"]').tooltip({
            trigger: "hover"
        }),
        fabric.Object.prototype.padding = 5,
        fabric.Object.prototype.transparentCorners = !1;
        var e = this.__canvas = new fabric.Canvas("c");
        fabric.Image.filters;
        e.on({
            "object:selected": function() {
                console.log("jc"),
                fabric.util.toArray(document.getElementsByTagName("input")).forEach(function(e) {
                    e.disabled = !1
                });
                for (var t = ["grayscale", "invert", "remove-white", "sepia", "sepia2", "brightness", "contrast", "saturate", "noise", "gradient-transparency", "pixelate", "blur", "sharpen", "emboss", "tint", "multiply", "blend"], o = 0; o < t.length; o++)
                    $(t[o]).checked = !!e.getActiveObject().filters[o]
            },
            "selection:cleared": function() {
                fabric.util.toArray(document.getElementsByTagName("input")).forEach(function(e) {
                    e.disabled = !0
                })
            }
        })
    }
}
]);

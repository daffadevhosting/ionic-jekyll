// Format Rupiah
function angkaToRp(angka) {
    var rupiah = '';    
    var angkarev = angka.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
              return 'Rp'+rupiah.split('',rupiah.length-1).reverse().join('');
    };

// Format Berat
function formatBerat(angka) {
    if (angka <= 0) {
        return "-";
    } else if (angka < 1000) {
        return angka + " gr";
    } else {
        return angka / 1000 + " Kg";
    }
};

var cart_kosong = '<div class="empty-cart"><svg fill="currentColor" viewBox="0 0 480 480"><path d="m411.9 436.48-24.36-276c-1.83-20.79-18.96-36.48-39.84-36.48-4.797 0-8.7 3.9-8.7 8.7v43.03c0 4.26-3.22 7.98-7.47 8.25-4.66.3-8.53-3.39-8.53-7.98v-93c0-45.77-37.23-83-83-83s-83 37.23-83 83v41h-24.7c-20.88 0-38.01 15.69-39.84 36.48l-24.36 276c-2.05 23.325 16.343 43.52 39.85 43.52h264.1c23.51 0 41.9-20.198 39.85-43.52zm-217.9-9.48h-58c-4.418 0-8-3.582-8-8s3.582-8 8-8h58c4.418 0 8 3.582 8 8s-3.582 8-8 8zm0-40h-58c-4.418 0-8-3.582-8-8s3.582-8 8-8h58c4.418 0 8 3.582 8 8s-3.582 8-8 8zm113-263h-109.3c-4.8 0-8.7 3.9-8.7 8.7v43.03c0 4.26-3.22 7.98-7.47 8.25-4.66.3-8.53-3.39-8.53-7.98v-93c0-36.94 30.06-67 67-67s67 30.06 67 67z"></svg><span class="center">Upss, Keranjang Anda masih kosong</span></div>';
var tombolMinus = '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19,13H5V11H19V13Z"></path></svg>';
var tombolPlus = '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>';
var tombolRemove = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M21.03,3L18,20.31C17.83,21.27 17,22 16,22H8C7,22 6.17,21.27 6,20.31L2.97,3H21.03M5.36,5L8,20H16L18.64,5H5.36M9,18V14H13V18H9M13,13.18L9.82,10L13,6.82L16.18,10L13,13.18Z"></path></svg>';

(function (window, document) {
    /*global HTMLElement */

    var typeof_string = typeof "",
        typeof_undefined = typeof undefined,
        typeof_function = typeof function () {},
        typeof_object = typeof {},
        isTypeOf = function (item, type) {
            return typeof item === type;
        },
        isString = function (item) {
            return isTypeOf(item, typeof_string);
        },
        isUndefined = function (item) {
            return isTypeOf(item, typeof_undefined);
        },
        isFunction = function (item) {
            return isTypeOf(item, typeof_function);
        },
        isObject = function (item) {
            return isTypeOf(item, typeof_object);
        },
        //Returns true if it is a DOM element
        isElement = function (o) {
            return typeof HTMLElement === "object" ? o instanceof HTMLElement : typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === "string";
        },
        generateSimpleCart = function (space) {
            // stealing this from selectivizr
            var selectorEngines = {
                    jQuery: "*",
                },
                // local variables for internal use
                item_id = 0,
                item_id_namespace = "SCI-",
                sc_items = {},
                namespace = space || "simpleCart",
                selectorFunctions = {},
                eventFunctions = {},
                baseEvents = {},
                // local references
                localStorage = window.localStorage,
                console = window.console || {
                    msgs: [],
                    log: function (msg) {
                        console.msgs.push(msg);
                    },
                },
                // used in views
                _VALUE_ = "value",
                _TEXT_ = "text",
                _HTML_ = "html",
                _CLICK_ = "click",
                // Currencies
                currencies = {
                    IDR: {
                        code: "IDR",
                        symbol: "Rp",
                        name: "Rupiah Indonesia",
                    },
                },
                // default options
                settings = {
                    currency: "IDR",
                    language: "Indonesia",

                    cartStyle: "div",
                    cartColumns: [],

                    excludeFromCheckout: ["thumb"],

                    shippingFlatRate: 0,
                    shippingQuantityRate: 0,
                    shippingTotalRate: 0,
                    shippingCustom: null,

                    taxRate: 0,

                    taxShipping: false,

                    data: {},
                },
                // main simpleCart object, function call is used for setting options
                simpleCart = function (options) {
                    // shortcut for simpleCart.ready
                    if (isFunction(options)) {
                        return simpleCart.ready(options);
                    }

                    // set options
                    if (isObject(options)) {
                        return simpleCart.extend(settings, options);
                    }
                },
                // selector engine
                $engine,
                // built in cart views for item cells
                cartColumnViews;

            // function for extending objects
            simpleCart.extend = function (target, opts) {
                var next;

                if (isUndefined(opts)) {
                    opts = target;
                    target = simpleCart;
                }

                for (next in opts) {
                    if (Object.prototype.hasOwnProperty.call(opts, next)) {
                        target[next] = opts[next];
                    }
                }
                return target;
            };

            // create copy function
            simpleCart.extend({
                copy: function (n) {
                    var cp = generateSimpleCart(n);
                    cp.init();
                    return cp;
                },
            });

            // add in the core functionality
            simpleCart.extend({
                isReady: false,

                // this is where the magic happens, the add function
                add: function (values, opt_quiet) {
                    var info = values || {},
                        newItem = new simpleCart.Item(info),
                        addItem = true,
                        // optionally supress event triggers
                        quiet = opt_quiet === true ? opt_quiet : false,
                        oldItem;

                    // trigger before add event
                    if (!quiet) {
                        addItem = simpleCart.trigger("beforeAdd", [newItem]);

                        if (addItem === false) {
                            return false;
                        }
                    }

                    // if the new item already exists, increment the value
                    oldItem = simpleCart.has(newItem);
                    if (oldItem) {
                        oldItem.increment(newItem.quantity());
                        newItem = oldItem;

                        // otherwise add the item
                    } else {
                        sc_items[newItem.id()] = newItem;
                    }

                    // update the cart
                    simpleCart.update();

                    if (!quiet) {
                        // trigger after add event
                        simpleCart.trigger("afterAdd", [newItem, isUndefined(oldItem)]);
                    }

                    // return a reference to the added item
                    return newItem;
                },

                // iteration function
                each: function (array, callback) {
                    var next,
                        x = 0,
                        result,
                        cb,
                        items;

                    if (isFunction(array)) {
                        cb = array;
                        items = sc_items;
                    } else if (isFunction(callback)) {
                        cb = callback;
                        items = array;
                    } else {
                        return;
                    }

                    for (next in items) {
                        if (Object.prototype.hasOwnProperty.call(items, next)) {
                            result = cb.call(simpleCart, items[next], x, next);
                            if (result === false) {
                                return;
                            }
                            x += 1;
                        }
                    }
                },

                find: function (id) {
                    var items = [];

                    // return object for id if it exists
                    if (isObject(sc_items[id])) {
                        return sc_items[id];
                    }
                    // search through items with the given criteria
                    if (isObject(id)) {
                        simpleCart.each(function (item) {
                            var match = true;
                            simpleCart.each(id, function (val, x, attr) {
                                if (isString(val)) {
                                    // less than or equal to
                                    if (val.match(/<=.*/)) {
                                        val = parseFloat(val.replace("<=", ""));
                                        if (!(item.get(attr) && parseFloat(item.get(attr)) <= val)) {
                                            match = false;
                                        }

                                        // less than
                                    } else if (val.match(/</)) {
                                        val = parseFloat(val.replace("<", ""));
                                        if (!(item.get(attr) && parseFloat(item.get(attr)) < val)) {
                                            match = false;
                                        }

                                        // greater than or equal to
                                    } else if (val.match(/>=/)) {
                                        val = parseFloat(val.replace(">=", ""));
                                        if (!(item.get(attr) && parseFloat(item.get(attr)) >= val)) {
                                            match = false;
                                        }

                                        // greater than
                                    } else if (val.match(/>/)) {
                                        val = parseFloat(val.replace(">", ""));
                                        if (!(item.get(attr) && parseFloat(item.get(attr)) > val)) {
                                            match = false;
                                        }

                                        // equal to
                                    } else if (!(item.get(attr) && item.get(attr) === val)) {
                                        match = false;
                                    }

                                    // equal to non string
                                } else if (!(item.get(attr) && item.get(attr) === val)) {
                                    match = false;
                                }

                                return match;
                            });

                            // add the item if it matches
                            if (match) {
                                items.push(item);
                            }
                        });
                        return items;
                    }

                    // if no criteria is given we return all items
                    if (isUndefined(id)) {
                        // use a new array so we don't give a reference to the
                        // cart's item array
                        simpleCart.each(function (item) {
                            items.push(item);
                        });
                        return items;
                    }

                    // return empty array as default
                    return items;
                },

                // return all items
                items: function () {
                    return this.find();
                },

                // check to see if item is in the cart already
                has: function (item) {
                    var match = false;

                    simpleCart.each(function (testItem) {
                        if (testItem.equals(item)) {
                            match = testItem;
                        }
                    });
                    return match;
                },

                // empty the cart
                empty: function () {
                    // remove each item individually so we see the remove events
                    var newItems = {};
                    simpleCart.each(function (item) {
                        // send a param of true to make sure it doesn't
                        // update after every removal
                        // keep the item if the function returns false,
                        // because we know it has been prevented
                        // from being removed
                        if (item.remove(true) === false) {
                            newItems[item.id()] = item;
                        }
                    });
                    sc_items = newItems;
                    simpleCart.update();
                },

                // functions for accessing cart info
                quantity: function () {
                    var quantity = 0;
                    simpleCart.each(function (item) {
                        quantity += item.quantity();
                    });
                    return quantity;
                },

                totalberat: function () {
                    var totalberat = 0;
                    simpleCart.each(function (item) {
                        totalberat += item.totalberat();
                    });
                    return totalberat;
                },

                total: function () {
                    var total = 0;
                    simpleCart.each(function (item) {
                        total += item.total();
                    });
                    return total;
                },

                grandTotal: function () {
                    return simpleCart.total() + simpleCart.tax() + simpleCart.shipping();
                },

                // updating functions
                update: function () {
                    simpleCart.save();
                    simpleCart.trigger("update");
                },

                init: function () {
                    simpleCart.load();
                    simpleCart.update();
                    simpleCart.ready();
                },

                // view management
                $: function (selector) {
                    return new simpleCart.ELEMENT(selector);
                },

                $create: function (tag) {
                    return simpleCart.$(document.createElement(tag));
                },

                setupViewTool: function () {
                    var members,
                        member,
                        context = window,
                        engine;

                    // Determine the "best fit" selector engine
                    for (engine in selectorEngines) {
                        if (Object.prototype.hasOwnProperty.call(selectorEngines, engine) && window[engine]) {
                            members = selectorEngines[engine].replace("*", engine).split(".");
                            member = members.shift();
                            if (member) {
                                context = context[member];
                            }
                            if (typeof context === "function") {
                                // set the selector engine and extend the prototype of our
                                // element wrapper class
                                $engine = context;
                                simpleCart.extend(simpleCart.ELEMENT._, selectorFunctions[engine]);
                                return;
                            }
                        }
                    }
                },

                // return a list of id's in the cart
                ids: function () {
                    var ids = [];
                    simpleCart.each(function (item) {
                        ids.push(item.id());
                    });
                    return ids;
                },

                // storage
                save: function () {
                    simpleCart.trigger("beforeSave");

                    var items = {};

                    // save all the items
                    simpleCart.each(function (item) {
                        items[item.id()] = simpleCart.extend(item.fields(), item.options());
                    });

                    localStorage.setItem(namespace + "_items", JSON.stringify(items));

                    simpleCart.trigger("afterSave");
                },

                load: function () {
                    // empty without the update
                    sc_items = {};

                    var items = localStorage.getItem(namespace + "_items");

                    if (!items) {
                        return;
                    }

                    // we wrap this in a try statement so we can catch
                    // any json parsing errors. no more stick and we
                    // have a playing card pluckin the spokes now...
                    // soundin like a harley.
                    try {
                        simpleCart.each(JSON.parse(items), function (item) {
                            simpleCart.add(item, true);
                        });
                    } catch (e) {
                        simpleCart.error("Error Loading data: " + e);
                    }

                    simpleCart.trigger("load");
                },

                // ready function used as a shortcut for bind('ready',fn)
                ready: function (fn) {
                    if (isFunction(fn)) {
                        // call function if already ready already
                        if (simpleCart.isReady) {
                            fn.call(simpleCart);

                            // bind if not ready
                        } else {
                            simpleCart.bind("ready", fn);
                        }

                        // trigger ready event
                    } else if (isUndefined(fn) && !simpleCart.isReady) {
                        simpleCart.trigger("ready");
                        simpleCart.isReady = true;
                    }
                },

                error: function (message) {
                    var msg = "";
                    if (isString(message)) {
                        msg = message;
                    } else if (isObject(message) && isString(message.message)) {
                        msg = message.message;
                    }
                    try {
                        console.log("simpleCart(js) Error: " + msg);
                    } catch (e) {}
                    simpleCart.trigger("error", [message]);
                },
            });

            /*******************************************************************
             *	TAX AND SHIPPING
             *******************************************************************/
            simpleCart.extend({
                // TODO: tax and shipping
                tax: function () {
                    var totalToTax = settings.taxShipping ? simpleCart.total() + simpleCart.shipping() : simpleCart.total(),
                        cost = simpleCart.taxRate() * totalToTax;

                    simpleCart.each(function (item) {
                        if (item.get("tax")) {
                            cost += item.get("tax");
                        } else if (item.get("taxRate")) {
                            cost += item.get("taxRate") * item.total();
                        }
                    });
                    return parseFloat(cost);
                },

                taxRate: function () {
                    return settings.taxRate || 0;
                },

                shipping: function (opt_custom_function) {
                    // shortcut to extend options with custom shipping
                    if (isFunction(opt_custom_function)) {
                        simpleCart({
                            shippingCustom: opt_custom_function,
                        });
                        return;
                    }

                    var cost = settings.shippingQuantityRate * simpleCart.quantity() + settings.shippingTotalRate * simpleCart.total() + settings.shippingFlatRate;

                    if (isFunction(settings.shippingCustom)) {
                        cost += settings.shippingCustom.call(simpleCart);
                    }

                    simpleCart.each(function (item) {
                        cost += parseFloat(item.get("shipping") || 0);
                    });
                    return parseFloat(cost);
                },
            });

            /*******************************************************************
             *	CART VIEWS
             *******************************************************************/

            // built in cart views for item cells
            cartColumnViews = {
                attr: function (item, column) {
                    return item.get(column.attr) || "";
                },
                harga: function (item, column) {
                    return [simpleCart.toCurrency(item.get(column.attr) || 0)];
                },
                currency: function (item, column) {
                    return ["<span class='sub-total'>Sub total</span> " + simpleCart.toCurrency(item.get(column.attr) || 0)];
                },
                jumlah: function (item, column) {
                    return [item.get(column.attr)];
                },
                ukuran: function (item, column) {
                    return item.get(column.attr)];
                },
                link: function (item, column) {
                    return [item.get(column.attr)];
                },
                linkproduk: function (item, column) {
                    return [item.get(column.attr)];
                },
                decrement: function (item, column) {
                    return ["<a href='javascript:;' class='" + namespace + "_decrement'>" + tombolMinus + "</a>"];
                },
                increment: function (item, column) {
                    return ["<a href='javascript:;' class='" + namespace + "_increment'>" + tombolPlus + "</a>"];
                },
                image: function (item, column) {
                    return ["<a href='" + item.get(column.attr) + "'><img src='" + item.get(column.attr) + "'/></a>"];
                },
                name: function (item, column) {
                    return "<a href='" + item.get(column.attr) + "'>" + column.text + "</a>";
                },
                input: function (item, column) {
                    return ["<input type='text' value='" + item.get(column.attr) + "' class='" + namespace + "_input'/>"];
                },
                berat: function (item, column) {
                    return [item.get(column.attr)];
                },
                totalberat: function (item, column) {
                    return "<span class='total-berat' data-berat='" + item.get(column.attr) + "'>Berat" + formatBerat(item.get(column.attr)) + "</span>";
                },
                catatan: function (item, column) {
                    return [item.get(column.attr)];
                },
                remove: function (item, column) {
                    return ["<a href='javascript:;' class='" + namespace + "_remove'>" + tombolRemove + "</a>"];
                },
            };

            // cart column wrapper class and functions
            function cartColumn(opts) {
                var options = opts || {};
                return simpleCart.extend(
                    {
                        attr: "",
                        label: "",
                        view: "attr",
                        text: "",
                        className: "",
                        hide: false,
                    },
                    options
                );
            }

            function cartCellView(item, column) {
                var viewFunc = isFunction(column.view) ? column.view : isString(column.view) && isFunction(cartColumnViews[column.view]) ? cartColumnViews[column.view] : cartColumnViews.attr;

                return viewFunc.call(simpleCart, item, column);
            }

            simpleCart.extend({
                // write out cart
                writeCart: function (selector) {
                    var TABLE = settings.cartStyle.toLowerCase(),
                        isTable = TABLE === "table",
                        TR = isTable ? "tr" : "div",
                        TH = isTable ? "th" : "div",
                        TD = isTable ? "td" : "div",
                        THEAD = isTable ? "thead" : "div",
                        cart_container = simpleCart.$create(TABLE),
                        thead_container = simpleCart.$create(THEAD),
                        header_container = simpleCart.$create(TR).addClass("headerRow"),
                        container = simpleCart.$(selector),
                        column,
                        klass,
                        label,
                        x,
                        xlen;
                       $(".ck-btn,.basket-detail,.harga-total,#total-harga").hide();
                       $(".keranjang-kosong").show();

                    container.html(" ").append(cart_container);

                    cart_container.append(cart_kosong);

                    thead_container.append(header_container);

                    // create header
                    for (x = 0, xlen = settings.cartColumns.length; x < xlen; x += 1) {
                        column = cartColumn(settings.cartColumns[x]);
                        klass = "item-" + (column.attr || column.view || column.label || column.text || "cell") + " " + column.className;
                        label = column.label || "";

                        // append the header cell
                        header_container.append(simpleCart.$create(TH).addClass(klass).html(label));
                    }

                    // cycle through the items
                    simpleCart.each(function (item, y) {
                        simpleCart.createCartRow(item, y, TR, TD, cart_container);
                    });

                    return cart_container;
                },

                // generate a cart row from an item
                createCartRow: function (item, y, TR, TD, container) {
                    var row = simpleCart
                            .$create(TR)
                            .addClass("itemRow row-" + y + " " + (y % 2 ? "even" : "odd"))
                            .attr("id", "cartItem_" + item.id()),
                        j,
                        jlen,
                        column,
                        klass,
                        content,
                        cell;
                    $(".empty-cart,.keranjang-kosong").hide();
                    $(".ck-btn,.basket-detail,.harga-total,#total-harga").show();

                    container.append(row);

                    // cycle through the columns to create each cell for the item
                    for (j = 0, jlen = settings.cartColumns.length; j < jlen; j += 1) {
                        column = cartColumn(settings.cartColumns[j]);
                        klass = "item-" + (column.attr || (isString(column.view) ? column.view : column.label || column.text || "cell")) + " " + column.className;
                        content = cartCellView(item, column);
                        cell = simpleCart.$create(TD).addClass(klass).html(content);

                        row.append(cell);
                        $(".item-size").each(function () {
                            var lihat = $(this).text();
                            if (lihat == "Keterangan: undefined") {
                                $(this).parents(".itemRow").find(".item-size").remove();
                            }
                        });
                    }
                    return row;
                },
            });

            /*******************************************************************
             *	CART ITEM CLASS MANAGEMENT
             *******************************************************************/

            simpleCart.Item = function (info) {
                // we use the data object to track values for the item
                var _data = {},
                    me = this;

                // cycle through given attributes and set them to the data object
                if (isObject(info)) {
                    simpleCart.extend(_data, info);
                }

                // set the item id
                item_id += 1;
                _data.id = _data.id || item_id_namespace + item_id;
                while (!isUndefined(sc_items[_data.id])) {
                    item_id += 1;
                    _data.id = item_id_namespace + item_id;
                }

                function checkQuantityAndPrice() {
                    // check to make sure price is valid
                    if (isString(_data.price)) {
                        // trying to remove all chars that aren't numbers or '.'
                        _data.price = parseFloat(_data.price.replace(simpleCart.currency().decimal, ".").replace(/[^0-9]/g, ""));
                    }
                    if (isNaN(_data.price)) {
                        _data.price = 0;
                    }
                    if (_data.price < 0) {
                        _data.price = 0;
                    }

                    // check to make sure quantity is valid
                    if (isString(_data.quantity)) {
                        _data.quantity = parseInt(_data.quantity.replace(simpleCart.currency().delimiter, ""), 10);
                    }
                    if (isNaN(_data.quantity)) {
                        _data.quantity = 1;
                    }
                    if (_data.quantity <= 0) {
                        me.remove();
                    }
                }

                // getter and setter methods to access private variables
                me.get = function (name, skipPrototypes) {
                    var usePrototypes = !skipPrototypes;

                    if (isUndefined(name)) {
                        return name;
                    }

                    // return the value in order of the data object and then the prototype
                    return isFunction(_data[name])
                        ? _data[name].call(me)
                        : !isUndefined(_data[name])
                        ? _data[name]
                        : isFunction(me[name]) && usePrototypes
                        ? me[name].call(me)
                        : !isUndefined(me[name]) && usePrototypes
                        ? me[name]
                        : _data[name];
                };
                me.set = function (name, value) {
                    if (!isUndefined(name)) {
                        _data[name.toLowerCase()] = value;
                        if (name.toLowerCase() === "price" || name.toLowerCase() === "quantity") {
                            checkQuantityAndPrice();
                        }
                    }
                    return me;
                };
                me.equals = function (item) {
                    for (var label in _data) {
                        if (Object.prototype.hasOwnProperty.call(_data, label)) {
                            if (label !== "quantity" && label !== "id") {
                                if (item.get(label) !== _data[label]) {
                                    return false;
                                }
                            }
                        }
                    }
                    return true;
                };
                me.options = function () {
                    var data = {};
                    simpleCart.each(_data, function (val, x, label) {
                        var add = true;
                        simpleCart.each(me.reservedFields(), function (field) {
                            if (field === label) {
                                add = false;
                            }
                            return add;
                        });

                        if (add) {
                            data[label] = me.get(label);
                        }
                    });
                    return data;
                };

                checkQuantityAndPrice();
            };

            simpleCart.Item._ = simpleCart.Item.prototype = {
                // editing the item quantity
                increment: function (amount) {
                    var diff = amount || 1;
                    diff = parseInt(diff, 10);

                    this.quantity(this.quantity() + diff);
                    if (this.quantity() < 1) {
                        this.remove();
                        return null;
                    }
                    return this;
                },
                decrement: function (amount) {
                    var diff = amount || 1;
                    return this.increment(-parseInt(diff, 10));
                },
                remove: function (skipUpdate) {
                    var removeItemBool = simpleCart.trigger("beforeRemove", [sc_items[this.id()]]);
                    if (removeItemBool === false) {
                        return false;
                    }
                    delete sc_items[this.id()];
                    if (!skipUpdate) {
                        simpleCart.update();
                    }
                    return null;
                },

                // special fields for items
                reservedFields: function () {
                    return ["quantity", "id", "item_number", "price", "name", "shipping", "tax", "taxRate"];
                },

                // return values for all reserved fields if they exist
                fields: function () {
                    var data = {},
                        me = this;
                    simpleCart.each(me.reservedFields(), function (field) {
                        if (me.get(field)) {
                            data[field] = me.get(field);
                        }
                    });
                    return data;
                },

                // shortcuts for getter/setters. can
                // be overwritten for customization
                // btw, we are hiring at wojo design, and could
                // use a great web designer. if thats you, you can
                // get more info at http://wojodesign.com/now-hiring/
                // or email me directly: brett@wojodesign.com
                quantity: function (val) {
                    return isUndefined(val) ? parseInt(this.get("quantity", true) || 1, 10) : this.set("quantity", val);
                },
                price: function (val) {
                    return isUndefined(val)
                        ? parseFloat(this.get("price", true).toString().replace(simpleCart.currency().symbol, "").replace(simpleCart.currency().delimiter, "") || 1)
                        : this.set("price", parseFloat(val.toString().replace(simpleCart.currency().symbol, "").replace(simpleCart.currency().delimiter, "")));
                },
                id: function () {
                    return this.get("id", false);
                },
                berat: function (val) {
                    return isUndefined(val) ? parseInt(this.get("berat", true) || 1, 10) : this.set("berat", val);
                },
                totalberat: function () {
                    return this.quantity() * this.berat();
                },
                total: function () {
                    return this.quantity() * this.price();
                },
            };

            /*******************************************************************
             *	CHECKOUT MANAGEMENT
             *******************************************************************/

            simpleCart.extend({
                checkout: function (opts) {
                    // url required
                    if (!opts.url) {
                        return simpleCart.error("URL required for SendForm Checkout");
                    }

                    // build basic form options
                    var data = {
                            shipping: simpleCart.shipping(),
                            totalBerat: simpleCart.totalberat(),
                            grandTotal: simpleCart.grandTotal(),
                            total: simpleCart.total(),
                            itemCount: simpleCart.find({}).length,
                        },
                        action = opts.url,
                        method = opts.method === "GET" ? "GET" : "POST";

                    // add items to data
                    simpleCart.each(function (item, x) {
                        var counter = x + 1,
                            options_list = [],
                            send;
                        data["item_thumb_" + counter] = item.get("thumb");
                        data["item_name_" + counter] = item.get("name");
                        data["item_quantity_" + counter] = item.quantity();
                        data["item_price_" + counter] = item.price();
                        data["item_berat_" + counter] = item.berat();

                        // create array of extra options
                        simpleCart.each(item.options(), function (val, x, attr) {
                            // check to see if we need to exclude this from checkout
                            send = true;
                            simpleCart.each(settings.excludeFromCheckout, function (field_name) {
                                if (field_name === attr) {
                                    send = false;
                                }
                            });
                            if (send) {
                                options_list.push(attr + ": " + val);
                            }
                        });

                        // add the options to the description
                        data["item_options_" + counter] = options_list.join(", ");
                    });

                    // check for return and success URLs in the options
                    if (opts.success) {
                        data["return"] = opts.success;
                    }
                    if (opts.cancel) {
                        data.cancel_return = opts.cancel;
                    }

                    if (opts.extra_data) {
                        data = simpleCart.extend(data, opts.extra_data);
                    }

                    $.ajax({
                        type: method,
                        url: action,
                        dataType: "json",
                        data: data,
                        success: function (data) {
                        },
                    });
                },
            });

            /*******************************************************************
             *	EVENT MANAGEMENT
             *******************************************************************/
            eventFunctions = {
                // bind a callback to an event
                bind: function (name, callback) {
                    if (!isFunction(callback)) {
                        return this;
                    }

                    if (!this._events) {
                        this._events = {};
                    }

                    // split by spaces to allow for multiple event bindings at once
                    var eventNameList = name.split(/ +/);

                    // iterate through and bind each event
                    simpleCart.each(eventNameList, function (eventName) {
                        if (this._events[eventName] === true) {
                            callback.apply(this);
                        } else if (!isUndefined(this._events[eventName])) {
                            this._events[eventName].push(callback);
                        } else {
                            this._events[eventName] = [callback];
                        }
                    });

                    return this;
                },

                // trigger event
                trigger: function (name, options) {
                    var returnval = true,
                        x,
                        xlen;

                    if (!this._events) {
                        this._events = {};
                    }
                    if (!isUndefined(this._events[name]) && isFunction(this._events[name][0])) {
                        for (x = 0, xlen = this._events[name].length; x < xlen; x += 1) {
                            returnval = this._events[name][x].apply(this, options || []);
                        }
                    }
                    if (returnval === false) {
                        return false;
                    }
                    return true;
                },
            };
            // alias for bind
            eventFunctions.on = eventFunctions.bind;
            simpleCart.extend(eventFunctions);
            simpleCart.extend(simpleCart.Item._, eventFunctions);

            // base simpleCart events in options
            baseEvents = {
                beforeAdd: null,
                afterAdd: null,
                load: null,
                beforeSave: null,
                afterSave: null,
                update: null,
                ready: null,
                checkoutSuccess: null,
                checkoutFail: null,
                beforeCheckout: null,
                beforeRemove: null,
            };

            // extend with base events
            simpleCart(baseEvents);

            // bind settings to events
            simpleCart.each(baseEvents, function (val, x, name) {
                simpleCart.bind(name, function () {
                    if (isFunction(settings[name])) {
                        settings[name].apply(this, arguments);
                    }
                });
            });

            simpleCart.bind("beforeAdd", function (item) {
                if (simpleCart.has(item)) {
                    $(".info-write").text("Produk ini sudah ditambahkan");
                    $("#informasi").show();
                    $(".info-button-ok").click(function () {
                        $("#informasi").hide();
                        return false;
                    });
                    return false;
                }
            });

            /*******************************************************************
             *	FORMATTING FUNCTIONS
             *******************************************************************/
            simpleCart.extend({
                toCurrency: function (number, opts) {
                    var num = parseFloat(number),
                        opt_input = opts || {},
                        _opts = simpleCart.extend(
                            simpleCart.extend(
                                {
                                    symbol: "Rp",
                                    decimal: "",
                                    delimiter: ".",
                                    accuracy: 0,
                                    after: false,
                                },
                                simpleCart.currency()
                            ),
                            opt_input
                        ),
                        numParts = num.toFixed(_opts.accuracy).split("."),
                        dec = numParts[1],
                        ints = numParts[0];

                    ints = simpleCart.chunk(ints.reverse(), 3).join(_opts.delimiter.reverse()).reverse();

                    return (!_opts.after ? _opts.symbol : "") + ints + (dec ? _opts.decimal + dec : "") + (_opts.after ? _opts.symbol : "");
                },

                // break a string in blocks of size n
                chunk: function (str, n) {
                    if (typeof n === "undefined") {
                        n = 2;
                    }
                    var result = str.match(new RegExp(".{1," + n + "}", "g"));
                    return result || [];
                },
            });

            // reverse string function
            String.prototype.reverse = function () {
                return this.split("").reverse().join("");
            };

            // currency functions
            simpleCart.extend({
                currency: function (currency) {
                    if (isString(currency) && !isUndefined(currencies[currency])) {
                        settings.currency = currency;
                    } else if (isObject(currency)) {
                        currencies[currency.code] = currency;
                        settings.currency = currency.code;
                    } else {
                        return currencies[settings.currency];
                    }
                },
            });

            /*******************************************************************
             *	VIEW MANAGEMENT
             *******************************************************************/

            simpleCart.extend({
                // bind outlets to function
                bindOutlets: function (outlets) {
                    simpleCart.each(outlets, function (callback, x, selector) {
                        simpleCart.bind("update", function () {
                            simpleCart.setOutlet("." + namespace + "_" + selector, callback);
                        });
                    });
                },

                // set function return to outlet
                setOutlet: function (selector, func) {
                    var val = func.call(simpleCart, selector);
                    if (isObject(val) && val.el) {
                        simpleCart.$(selector).html(" ").append(val);
                    } else if (!isUndefined(val)) {
                        simpleCart.$(selector).html(val);
                    }
                },

                // bind click events on inputs
                bindInputs: function (inputs) {
                    simpleCart.each(inputs, function (info) {
                        simpleCart.setInput("." + namespace + "_" + info.selector, info.event, info.callback);
                    });
                },

                // attach events to inputs
                setInput: function (selector, event, func) {
                    simpleCart.$(selector).live(event, func);
                },
            });

            // class for wrapping DOM selector shit
            simpleCart.ELEMENT = function (selector) {
                this.create(selector);
                this.selector = selector || null; // "#" + this.attr('id'); TODO: test length?
            };

            simpleCart.extend(selectorFunctions, {
                jQuery: {
                    passthrough: function (action, val) {
                        if (isUndefined(val)) {
                            return this.el[action]();
                        }

                        this.el[action](val);
                        return this;
                    },
                    text: function (text) {
                        return this.passthrough(_TEXT_, text);
                    },
                    html: function (html) {
                        return this.passthrough(_HTML_, html);
                    },
                    val: function (val) {
                        return this.passthrough("val", val);
                    },
                    append: function (item) {
                        var target = item.el || item;
                        this.el.append(target);
                        return this;
                    },
                    attr: function (attr, val) {
                        if (isUndefined(val)) {
                            return this.el.attr(attr);
                        }
                        this.el.attr(attr, val);
                        return this;
                    },
                    remove: function () {
                        this.el.remove();
                        return this;
                    },
                    addClass: function (klass) {
                        this.el.addClass(klass);
                        return this;
                    },
                    removeClass: function (klass) {
                        this.el.removeClass(klass);
                        return this;
                    },
                    each: function (callback) {
                        return this.passthrough("each", callback);
                    },
                    click: function (callback) {
                        return this.passthrough(_CLICK_, callback);
                    },
                    live: function (event, callback) {
                        $engine(document).delegate(this.selector, event, callback);
                        return this;
                    },
                    parent: function () {
                        return simpleCart.$(this.el.parent());
                    },
                    find: function (selector) {
                        return simpleCart.$(this.el.find(selector));
                    },
                    closest: function (selector) {
                        return simpleCart.$(this.el.closest(selector));
                    },
                    tag: function () {
                        return this.el[0].tagName;
                    },
                    descendants: function () {
                        return simpleCart.$(this.el.find("*"));
                    },
                    submit: function () {
                        return this.el.submit();
                    },

                    create: function (selector) {
                        this.el = $engine(selector);
                    },
                },
            });
            simpleCart.ELEMENT._ = simpleCart.ELEMENT.prototype;

            // bind the DOM setup to the ready event
            simpleCart.ready(simpleCart.setupViewTool);

            // bind the input and output events
            simpleCart.ready(function () {
                simpleCart.bindOutlets({
                    total: function () {
                        return simpleCart.toCurrency(simpleCart.total());
                    },
                    totalberat: function () {
                        return "<span id='total-berat' data-berat='" + simpleCart.totalberat() + "'>" + formatBerat(simpleCart.totalberat()) + "</span>";
                    },
                    quantity: function () {
                        return simpleCart.quantity();
                    },
                    items: function (selector) {
                        simpleCart.writeCart(selector);
                    },
                    tax: function () {
                        return simpleCart.toCurrency(simpleCart.tax());
                    },
                    taxRate: function () {
                        return simpleCart.taxRate().toFixed();
                    },
                    shipping: function () {
                        return simpleCart.toCurrency(simpleCart.shipping());
                    },
                    grandTotal: function () {
                        return ["<span id='totalpembayaran' class='totalpembayaran' data-total='" + simpleCart.grandTotal() + "'>" + simpleCart.toCurrency(simpleCart.grandTotal()) + "</span"];
                    },
                });
                simpleCart.bindInputs([
                    {
                        selector: "checkout",
                        event: "click",
                        callback: function () {
                            simpleCart.checkout();
                        },
                    },
                    {
                        selector: "empty",
                        event: "click",
                        callback: function () {
                            simpleCart.empty();
                        },
                    },
                    {
                        selector: "increment",
                        event: "click",
                        callback: function () {
                            simpleCart.find(simpleCart.$(this).closest(".itemRow").attr("id").split("_")[1]).increment();
                            simpleCart.update();
                        },
                    },
                    {
                        selector: "decrement",
                        event: "click",
                        callback: function () {
                            simpleCart.find(simpleCart.$(this).closest(".itemRow").attr("id").split("_")[1]).decrement();
                            simpleCart.update();
                        },
                    },
                    /* remove from cart */
                    {
                        selector: "remove",
                        event: "click",
                        callback: function () {
                            simpleCart.find(simpleCart.$(this).closest(".itemRow").attr("id").split("_")[1]).remove();
                        },
                    },

                    /* cart inputs */
                    {
                        selector: "input",
                        event: "change",
                        callback: function () {
                            var $input = simpleCart.$(this),
                                $parent = $input.parent(),
                                classList = $parent.attr("class").split(" ");
                            simpleCart.each(classList, function (klass) {
                                if (klass.match(/item-.+/i)) {
                                    var field = klass.split("-")[1];
                                    simpleCart.find($parent.closest(".itemRow").attr("id").split("_")[1]).set(field, $input.val());
                                    simpleCart.update();
                                    return;
                                }
                            });
                        },
                    },

                    /* here is our shelfItem add to cart button listener */
                    {
                        selector: "shelfItem .item_add",
                        event: "click",
                        callback: function () {
                            var $button = simpleCart.$(this),
                                fields = {};

                            $button
                                .closest("." + namespace + "_shelfItem")
                                .descendants()
                                .each(function (x, item) {
                                    var $item = simpleCart.$(item);

                                    // check to see if the class matches the item_[fieldname] pattern
                                    if ($item.attr("class") && $item.attr("class").match(/item_.+/) && !$item.attr("class").match(/item_add/)) {
                                        // find the class name
                                        simpleCart.each($item.attr("class").split(" "), function (klass) {
                                            var attr, val, type;

                                            // get the value or text depending on the tagName
                                            if (klass.match(/item_.+/)) {
                                                attr = klass.split("_")[1];
                                                val = "";
                                                switch ($item.tag().toLowerCase()) {
                                                    case "input":
                                                    case "textarea":
                                                    case "select":
                                                        type = $item.attr("type");
                                                        if (!type || ((type.toLowerCase() === "checkbox" || type.toLowerCase() === "radio") && $item.attr("checked")) || type.toLowerCase() === "text" || type.toLowerCase() === "number") {
                                                            val = $item.val();
                                                        }
                                                        break;
                                                    case "img":
                                                        val = $item.attr("src");
                                                        break;
                                                    default:
                                                        val = $item.text();
                                                        break;
                                                }

                                                if (val !== null && val !== "") {
                                                    fields[attr.toLowerCase()] = fields[attr.toLowerCase()] ? fields[attr.toLowerCase()] + ", " + val : val;
                                                }
                                            }
                                        });
                                    }
                                });

                            // add the item
                            simpleCart.add(fields);
                        },
                    },
                ]);
            });

            /*******************************************************************
             *	DOM READY
             *******************************************************************/
            // Cleanup functions for the document ready method
            // used from jQuery
            /*global DOMContentLoaded */
            if (document.addEventListener) {
                window.DOMContentLoaded = function () {
                    document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                    simpleCart.init();
                };
            } else if (document.attachEvent) {
                window.DOMContentLoaded = function () {
                    // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", DOMContentLoaded);
                        simpleCart.init();
                    }
                };
            }
            // The DOM ready check for Internet Explorer
            // used from jQuery
            function doScrollCheck() {
                if (simpleCart.isReady) {
                    return;
                }

                try {
                    // If IE is used, use the trick by Diego Perini
                    // http://javascript.nwbox.com/IEContentLoaded/
                    document.documentElement.doScroll("left");
                } catch (e) {
                    setTimeout(doScrollCheck, 1);
                    return;
                }

                // and execute any waiting functions
                simpleCart.init();
            }

            // bind ready event used from jquery
            function sc_BindReady() {
                // Catch cases where $(document).ready() is called after the
                // browser event has already occurred.
                if (document.readyState === "complete") {
                    // Handle it asynchronously to allow scripts the opportunity to delay ready
                    return setTimeout(simpleCart.init, 1);
                }

                // Mozilla, Opera and webkit nightlies currently support this event
                if (document.addEventListener) {
                    // Use the handy event callback
                    document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

                    // A fallback to window.onload, that will always work
                    window.addEventListener("load", simpleCart.init, false);

                    // If IE event model is used
                } else if (document.attachEvent) {
                    // ensure firing before onload,
                    // maybe late but safe also for iframes
                    document.attachEvent("onreadystatechange", DOMContentLoaded);

                    // A fallback to window.onload, that will always work
                    window.attachEvent("onload", simpleCart.init);

                    // If IE and not a frame
                    // continually check to see if the document is ready
                    var toplevel = false;

                    try {
                        toplevel = window.frameElement === null;
                    } catch (e) {}

                    if (document.documentElement.doScroll && toplevel) {
                        doScrollCheck();
                    }
                }
            }

            // bind the ready event
            sc_BindReady();

            return simpleCart;
        };

    window.simpleCart = generateSimpleCart();
})(window, document);

/************ JSON *************/
var JSON;
JSON || (JSON = {});
(function () {
    function k(a) {
        return a < 10 ? "0" + a : a;
    }

    function o(a) {
        p.lastIndex = 0;
        return p.test(a)
            ? '"' +
                  a.replace(p, function (a) {
                      var c = r[a];
                      return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                  }) +
                  '"'
            : '"' + a + '"';
    }

    function l(a, j) {
        var c,
            d,
            h,
            m,
            g = e,
            f,
            b = j[a];
        b && typeof b === "object" && typeof b.toJSON === "function" && (b = b.toJSON(a));
        typeof i === "function" && (b = i.call(j, a, b));
        switch (typeof b) {
            case "string":
                return o(b);
            case "number":
                return isFinite(b) ? String(b) : "null";
            case "boolean":
            case "null":
                return String(b);
            case "object":
                if (!b) return "null";
                e += n;
                f = [];
                if (Object.prototype.toString.apply(b) === "[object Array]") {
                    m = b.length;
                    for (c = 0; c < m; c += 1) f[c] = l(c, b) || "null";
                    h = f.length === 0 ? "[]" : e ? "[\n" + e + f.join(",\n" + e) + "\n" + g + "]" : "[" + f.join(",") + "]";
                    e = g;
                    return h;
                }
                if (i && typeof i === "object") {
                    m = i.length;
                    for (c = 0; c < m; c += 1) typeof i[c] === "string" && ((d = i[c]), (h = l(d, b)) && f.push(o(d) + (e ? ": " : ":") + h));
                } else for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (h = l(d, b)) && f.push(o(d) + (e ? ": " : ":") + h);
                h = f.length === 0 ? "{}" : e ? "{\n" + e + f.join(",\n" + e) + "\n" + g + "}" : "{" + f.join(",") + "}";
                e = g;
                return h;
        }
    }
    if (typeof Date.prototype.toJSON !== "function")
        (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + k(this.getUTCMonth() + 1) + "-" + k(this.getUTCDate()) + "T" + k(this.getUTCHours()) + ":" + k(this.getUTCMinutes()) + ":" + k(this.getUTCSeconds()) + "Z" : null;
        }),
            (String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
                return this.valueOf();
            });
    var q = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        p = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        e,
        n,
        r = {
            "\u0008": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\u000c": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\",
        },
        i;
    if (typeof JSON.stringify !== "function")
        JSON.stringify = function (a, j, c) {
            var d;
            n = e = "";
            if (typeof c === "number") for (d = 0; d < c; d += 1) n += " ";
            else typeof c === "string" && (n = c);
            if ((i = j) && typeof j !== "function" && (typeof j !== "object" || typeof j.length !== "number")) throw Error("JSON.stringify");
            return l("", {
                "": a,
            });
        };
    if (typeof JSON.parse !== "function")
        JSON.parse = function (a, e) {
            function c(a, d) {
                var g,
                    f,
                    b = a[d];
                if (b && typeof b === "object") for (g in b) Object.prototype.hasOwnProperty.call(b, g) && ((f = c(b, g)), f !== void 0 ? (b[g] = f) : delete b[g]);
                return e.call(a, d, b);
            }
            var d,
                a = String(a);
            q.lastIndex = 0;
            q.test(a) &&
                (a = a.replace(q, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                }));
            if (
                /^[\],:{}\s]*$/.test(
                    a
                        .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
                )
            )
                return (
                    (d = eval("(" + a + ")")),
                    typeof e === "function"
                        ? c(
                              {
                                  "": d,
                              },
                              ""
                          )
                        : d
                );
            throw new SyntaxError("JSON.parse");
        };
})();

/************ HTML5 Local Storage Support *************/
(function () {
    if (!this.localStorage)
        if (this.globalStorage)
            try {
                this.localStorage = this.globalStorage;
            } catch (e) {}
        else {
            var a = document.createElement("div");
            a.style.display = "none";
            document.getElementsByTagName("head")[0].appendChild(a);
            if (a.addBehavior) {
                a.addBehavior("#default#userdata");
                var d = (this.localStorage = {
                        length: 0,
                        setItem: function (b, d) {
                            a.load("localStorage");
                            b = c(b);
                            a.getAttribute(b) || this.length++;
                            a.setAttribute(b, d);
                            a.save("localStorage");
                        },
                        getItem: function (b) {
                            a.load("localStorage");
                            b = c(b);
                            return a.getAttribute(b);
                        },
                        removeItem: function (b) {
                            a.load("localStorage");
                            b = c(b);
                            a.removeAttribute(b);
                            a.save("localStorage");
                            this.length = 0;
                        },
                        clear: function () {
                            a.load("localStorage");
                            for (var b = 0; (attr = a.XMLDocument.documentElement.attributes[b++]); ) a.removeAttribute(attr.name);
                            a.save("localStorage");
                            this.length = 0;
                        },
                        key: function (b) {
                            a.load("localStorage");
                            return a.XMLDocument.documentElement.attributes[b];
                        },
                    }),
                    c = function (a) {
                        return a.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g, "-");
                    };
                a.load("localStorage");
                d.length = a.XMLDocument.documentElement.attributes.length;
            }
        }
})();

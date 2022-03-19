simpleCart({
	cartColumns: [
{ attr: "thumb", label: false, view: "thumb" },
{ attr: "name", label: false, view: "link" },
{ view: "remove", text: false, label: !1 },
{ attr: "price", label: false, view: "harga" },
{ attr: "color", label: 'Warna', view: "warna" },
{ attr: "model", label: 'Model', view: "tali" },
{ view: "decrement", label: false },
{ attr: "quantity", label: 'Jumlah', view: "jumlah" },
{ view: "increment", label: false },
{ attr: "total", label: false, view: "currency" },
{ attr: "link", label: false, view: "link" },
],
	currency: "IDR",
});

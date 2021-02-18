class SensorModalElement {
  constructor(name, location) {
    this.name = name;
    this.location = location;
  }

  createModalElement(modalItems) {
    const html = `<div id="modal-${this.name}" class="mfp-hide white-popup"><input class="longitude" value="${this.location[0]}"type="hidden" /><input class="latitude" value="${this.location[1]}"type="hidden" />
    <p>${this.name}<br/>ここに詳細情報を表示</p>
  </div>`;
    modalItems.prepend(html);
  }
}

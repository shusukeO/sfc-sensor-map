class SensorModalElement {
  constructor(name, location) {
    this.name = name;
    this.location = location;
  }

  createModalElement(modalItems) {
    const html = `<div id="modal-${this.name}" class="mfp-hide white-popup">
      ${this.name}
  </div>`;
    modalItems.prepend(html);
  }
}

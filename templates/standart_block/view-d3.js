import d3 from 'd3';
import Observer from './../helpers/observer.js'

export default class {{name}}D3View extends Observer {
    init() {
        this.stage = d3.select('body').append('div');
    }
    onUpdate(data) {
        var awroles = this.stage.selectAll('div')
            .data(data, (d) => d.id);

        awroles
            .classed('item__selected', (d) => d.selected)
        ;

        awroles.enter()
            .append('div')
            .text((d) => `Item #${d.id}`)
            .classed('item', true)
            .classed('item__selected', (d) => d.selected)
            .on('click', this.onItemClick.bind(this))
        ;

        awroles.exit()
            .remove()
        ;

    }
    onItemClick(item) {
        this.fire('item click', item.id);
    }
}

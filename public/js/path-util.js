class PathLoader {
    constructor() {
        this.region = "";
        this.area = "";
        this.poi = "";
        this.detail = "";

        this.data = {};
    }

    loadPath = async (region, area, poi, detail) => {
        this.setPath(region, area, poi, detail);
        await this.load();
    }

    setPath(region, area, poi, detail) {
        this.region = region;
        this.area = area;
        this.poi = poi;
        this.detail = detail;
    }
    
    load = async () => {
        let route = `/${this.region}/${this.area}/${this.poi}/${this.detail}/load`;

        try {
            await $.get(route, dataToSave, (data) => {
                this.data = data;
            });

            return "loaded";
        } catch (error) {
            return error;
        }
    }

    get(where) {
        return this.data[where];
    }
    
    save = async (where, dataToSave) => {
        let route = `/${this.region}/${this.area}/${this.poi}/${this.detail}/save`;
        let oldData = this.data;

        try {
            this.data[where] = dataToSave;

            await $.post(route, this.data, (data) => {
                return "saved";
            });
        } catch (error) {
            this.data = oldData;
            return error;
        }
    }
}

const pathLoader = new PathLoader();
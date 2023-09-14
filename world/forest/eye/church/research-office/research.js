class BibleResearch {
    constructor(enableFloat = false) {
        this.$div = $(".bible-research");

        this.Reader = class Reader {
            constructor() {
                this.$div = null;
                this.location = {
                    book: 0,
                    chapter: 0,
                    verse: null
                };
                this.newLocation = {
                    book: 0,
                    chapter: 0,
                    verse: null
                };
                this.bibleInfo = [];

                base.do("get-bible-info").then((res) => {
                    this.bibleInfo = res.data;
                    this.setBooks();
                    this.openTo();
                });
            }

            render = () => {
                this.$div = $(`<div class="reader"></div>`);

                this.$finder = $(`<div class="finder"></div>`).appendTo(this.$div);
                this.$bookSelect = $(`<select class="books"></select>`).appendTo(this.$finder);
                this.$bookSelect.on("change", () => {
                    this.selectBook(this.$bookSelect.val());
                });
                this.$chapterSelect = $(`<select class="chapters"></select>`).appendTo(this.$finder);
                this.$chapterSelect.on("change", () => {
                    this.newLocation.chapter = parseInt(this.$chapterSelect.val());
                });
                this.$go = $(`<button class="open-to">Go</button>`).appendTo(this.$finder);
                this.$go.click(() => {
                    this.openTo();
                });

                this.$text = $(`<div class="text"></div>`).appendTo(this.$div);

                this.$previous = $(`<button class="previous">&lt;</button>`).appendTo(this.$div);
                this.$previous.click(() => {
                    console.log(this.location);
                    this.newLocation.chapter = this.location.chapter - 1;

                    if (this.newLocation.chapter < 0) {
                        if (this.newLocation.book > 0) {
                            this.newLocation.book -= 1;
                            this.newLocation.chapter = this.bibleInfo[this.newLocation.book].chapters.length - 1;
                        }
                        else this.newLocation = {
                            book: 0,
                            chapter: 0,
                            verse: null
                        };
                    }

                    this.openTo();
                    console.log(this.location);
                });

                this.$next = $(`<button class="next">&gt;</button>`).appendTo(this.$div);
                this.$next.click(() => {
                    console.log(this.location);
                    this.newLocation.chapter = this.location.chapter + 1;

                    if (this.newLocation.chapter > this.bibleInfo[this.location.book].chapters.length - 1) {
                        if (this.location.book < this.bibleInfo.length - 1) {
                            this.newLocation.book++;
                            this.newLocation.chapter = 0;
                        }
                        else this.newLocation = {
                            book: this.bibleInfo.length - 1,
                            chapter: this.bibleInfo[this.newLocation.book].chapters.length - 1,
                            verse: null
                        };
                    }

                    this.openTo();
                    console.log(this.location);
                });

                return this.$div;
            }

            setBooks = () => {
                this.$bookSelect.empty();

                for (let i = 0; i < this.bibleInfo.length; i++) {
                    this.$bookSelect.append(`<option value="${i}">${this.bibleInfo[i].name}</option>`);
                }

                this.setChapters();
            }

            setChapters = () => {
                this.newLocation.chapter = 0;
                this.$chapterSelect.empty();
                
                for (let i = 0; i < this.bibleInfo[this.newLocation.book].chapters.length; i++) {
                    this.$chapterSelect.append(`<option value="${i}">${i + 1}</option>`);
                }
            }

            selectBook = (book) => {
                this.newLocation.book = parseInt(book);

                this.setChapters();
            }

            openTo = async (location = this.newLocation) => {
                this.location = {
                    ...this.location,
                    ...location
                };
        
                let res = await base.do("get-bible", this.location);
        
                let text = "";
                for (let i = 0; i < res.data.verses.length; i++) {
                    text += `${i + 1}: `;
                    text += res.data.verses[i].text;
                    text += '<br /><br />';
                }
        
                this.$text.html(text);
                this.$bookSelect.val(`${this.location.book}`);
                this.setChapters();
                this.newLocation.chapter = this.location.chapter;
                this.$chapterSelect.val(`${this.location.chapter}`);
            }
        }
        this.reader = new this.Reader();
        this.$div.append(this.reader.render());

        this.$div.append(`<div class="browser" id="research"></div>`);
        this.browser = new Browser("research");
        this.$div.append(`<div class="search-box" id="research"></div>`);
        this.searchBox = new SearchBox("research");

        this.$div.append(`<div class="meta buttons" id="research"></div>`);
        this.personFields = new NBField({
            name: "persons",
            multiple: true,
            label: "Person: ",
            placeholder: "No Persons"
        }, [
            new NBField({
                name: "name",
                label: "Person: ",
                placeholder: "No Persons"
            }, "string"),
            new NBField({
                name: "aliases",
                multiple: true,
                label: "Aliases: ",
                placeholder: "No Aliases"
            }, "string"),
            new NBField({
                name: "description",
                label: "Description: ",
                placeholder: "No Description"
            }, "long-string"),
        ]);
        this.persons = new MetaBrowser("bible-research-persons", this.browser, this.personFields, {
            $origin: $(".meta.buttons#persons"),
            label: "Persons Controls",
            editable: true,
            multiple: true,
            searchBox: this.searchBox,
            toLoad: async () => {
                let res = await base.load("bible-research-persons");
                return res;
            },
            toSave: async (item, which) => {
                await base.do("save-person", {
                    item,
                    which
                });
            }
        });

        this.$div.append(`<div class="meta buttons" id="themes"></div>`);
        this.themeFields = new NBField({
            name: "themes",
            multiple: true,
            label: "Themes: ",
            placeholder: "No Themes"
        }, [
            new NBField({
                name: "name",
                label: "Theme: ",
                placeholder: "No Theme"
            }, "string"),
            new NBField({
                name: "aliases",
                multiple: true,
                label: "Aliases: ",
                placeholder: "No Aliases"
            }, "string"),
            new NBField({
                name: "description",
                label: "Description: ",
                placeholder: "No Description"
            }, "long-string"),
        ]);        
        this.themes = new MetaBrowser("themes", this.browser, this.themeFields, {
            $origin: $(".meta.buttons#themes"),
            label: "Themes Controls",
            editable: true,
            multiple: true,
            searchBox: this.searchBox,
            toLoad: async () => {
                let res = await base.load("bible-research-themes");
                return res;
            },
            toSave: async (item, which) => {
                await base.do("save-theme", {
                    item,
                    which
                });
            }
        });


        // this.metaResearch = new MetaBrowser("bible-research-persons", this.browser, this.personFields, {
        //     $origin: $(".meta.buttons#persons"),
        //     label: "Persons Controls",
        //     editable: true,
        //     multiple: true,
        //     searchBox: this.searchBox,
        //     toLoad: async () => {
        //         let res = await base.load("bible-research-persons");
        //         return res;
        //     },
        //     toSave: async (item, which) => {
        //         await base.do("save-person", {
        //             item,
        //             which
        //         });
        //     }
        // });
    
        // metaResearch.addButton(new Button("new", {
        //     onClick: this.new,
        //     label: "New"
        // }));




        if (enableFloat) this.enableFloat();
    }

    

    enableFloat = () => {
        this.reader.$div.addClass("floatable");
        this.persons.$div.addClass("floatable");
        this.themes.$div.addClass("floatable");
    }
}






class tQuantiles extends baseModal {
    static dialogId = 'tQuantiles'
    static t = baseModal.makeT(tQuantiles.dialogId)

    constructor() {
        var config = {
            id: tQuantiles.dialogId,
            label: tQuantiles.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::qt(c({{selected.prob | safe}}), df={{selected.degoffree | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: tQuantiles.t('prob'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            degoffree: {
                el: new input(config, {
                    no: 'degoffree',
                    label: tQuantiles.t('degoffree'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            labelSig: { el: new labelVar(config, { label: tQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: tQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: tQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.prob.el.content, objects.degoffree.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: tQuantiles.t('navigation'),
                icon: "icon-tumblr-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: tQuantiles.t('help.title'),
            r_help: tQuantiles.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: tQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new tQuantiles().render()
}







class exponentialQuantiles extends baseModal {
    static dialogId = 'exponentialQuantiles'
    static t = baseModal.makeT(exponentialQuantiles.dialogId)

    constructor() {
        var config = {
            id: exponentialQuantiles.dialogId,
            label: exponentialQuantiles.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::qexp(c({{selected.prob | safe}}), rate={{selected.rate | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: exponentialQuantiles.t('prob'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            rate: {
                el: new input(config, {
                    no: 'rate',
                    label: exponentialQuantiles.t('rate'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: exponentialQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: exponentialQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: exponentialQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.prob.el.content, objects.rate.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: exponentialQuantiles.t('navigation'),
                icon: "icon-letter-e-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: exponentialQuantiles.t('help.title'),
            r_help: "help(data,package='utils')",
            body: exponentialQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new exponentialQuantiles().render()
}







class binomialQuantiles extends baseModal {
    static dialogId = 'binomialQuantiles'
    static t = baseModal.makeT(binomialQuantiles.dialogId)

    constructor() {
        var config = {
            id: binomialQuantiles.dialogId,
            label: binomialQuantiles.t('title'),
            modalType: "one",
            RCode: `
                    local(
                        {
                        result = stats::qbinom(c({{selected.varvals | safe}}), size={{selected.size | safe}}, prob={{selected.prob | safe}}, lower.tail={{selected.a | safe}} )
                        print(result)
                        }
                        )                    
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: binomialQuantiles.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            size: {
                el: new input(config, {
                    no: 'size',
                    label: binomialQuantiles.t('size'),
                    required: true,
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",                    
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: binomialQuantiles.t('prob'),
                    required: true,
                    placeholder: "0.5",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0.5"
                })
            },
            labelSig: { el: new labelVar(config, { label: binomialQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: binomialQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: binomialQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.size.el.content, objects.prob.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: binomialQuantiles.t('navigation'),
                icon: "icon-binary-code-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: binomialQuantiles.t('help.title'),
            r_help: "help(data,package='utils')",
            body: binomialQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new binomialQuantiles().render()
}

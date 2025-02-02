





class poissonQuantiles extends baseModal {
    static dialogId = 'poissonQuantiles'
    static t = baseModal.makeT(poissonQuantiles.dialogId)

    constructor() {
        var config = {
            id: poissonQuantiles.dialogId,
            label: poissonQuantiles.t('title'),
            modalType: "one",
            RCode: `
                    local(
                        {
                        result = stats::qpois(c({{selected.varvals | safe}}), lambda={{selected.lambda | safe}}, lower.tail={{selected.a | safe}} )
                        print(result)
                        }
                        )                    
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: poissonQuantiles.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            lambda: {
                el: new input(config, {
                    no: 'lambda',
                    label: poissonQuantiles.t('lambda'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: poissonQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: poissonQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: poissonQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.lambda.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: poissonQuantiles.t('navigation'),
                icon: "icon-fish-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: poissonQuantiles.t('help.title'),
            r_help: poissonQuantiles.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: poissonQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new poissonQuantiles().render()
}







class betaQuantiles extends baseModal {
    static dialogId = 'betaQuantiles'
    static t = baseModal.makeT(betaQuantiles.dialogId)

    constructor() {
        var config = {
            id: betaQuantiles.dialogId,
            label: betaQuantiles.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::qbeta(c({{selected.varvals | safe}}), shape1={{selected.shape1 | safe}}, shape2={{selected.shape2 | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: betaQuantiles.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            shape1: {
                el: new input(config, {
                    no: 'shape1',
                    label: betaQuantiles.t('shape1'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            shape2: {
                el: new input(config, {
                    no: 'shape2',
                    label: betaQuantiles.t('shape2'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            labelSig: { el: new labelVar(config, { label: betaQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: betaQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: betaQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.shape1.el.content, objects.shape2.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: betaQuantiles.t('navigation'),
                icon: "icon-beta_q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: betaQuantiles.t('help.title'),
            r_help: betaQuantiles.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: betaQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new betaQuantiles().render()
}







class gammaQuantiles extends baseModal {
    static dialogId = 'gammaQuantiles'
    static t = baseModal.makeT(gammaQuantiles.dialogId)

    constructor() {
        var config = {
            id: gammaQuantiles.dialogId,
            label: gammaQuantiles.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::qgamma(c({{selected.prob | safe}}), shape={{selected.shape | safe}}, scale={{selected.scale | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: gammaQuantiles.t('prob'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            shape: {
                el: new input(config, {
                    no: 'shape',
                    label: gammaQuantiles.t('shape'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            scale: {
                el: new input(config, {
                    no: 'scale',
                    label: gammaQuantiles.t('scale'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: gammaQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: gammaQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: gammaQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.prob.el.content, objects.shape.el.content, objects.scale.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: gammaQuantiles.t('navigation'),
                icon: "icon-gamma-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: gammaQuantiles.t('help.title'),
            r_help: gammaQuantiles.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: gammaQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new gammaQuantiles().render()
}

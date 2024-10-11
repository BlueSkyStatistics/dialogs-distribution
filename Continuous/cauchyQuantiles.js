





class cauchyQuantiles extends baseModal {
    static dialogId = 'cauchyQuantiles'
    static t = baseModal.makeT(cauchyQuantiles.dialogId)

    constructor() {
        var config = {
            id: cauchyQuantiles.dialogId,
            label: cauchyQuantiles.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::qcauchy(c({{selected.varvals | safe}}), location={{selected.location | safe}}, scale={{selected.scale | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: cauchyQuantiles.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            location: {
                el: new input(config, {
                    no: 'location',
                    label: cauchyQuantiles.t('location'),
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
                    label: cauchyQuantiles.t('scale'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: cauchyQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: cauchyQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: cauchyQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.location.el.content, objects.scale.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: cauchyQuantiles.t('navigation'),
                icon: "icon-c-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: cauchyQuantiles.t('help.title'),
            r_help: "help(data,package='utils')",
            body: cauchyQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new cauchyQuantiles().render()
}

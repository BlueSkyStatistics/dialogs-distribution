





class cauchyProbabilities extends baseModal {
    static dialogId = 'cauchyProbabilities'
    static t = baseModal.makeT(cauchyProbabilities.dialogId)

    constructor() {
        var config = {
            id: cauchyProbabilities.dialogId,
            label: cauchyProbabilities.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::pcauchy(c({{selected.varvals | safe}}), location={{selected.location | safe}}, scale={{selected.scale | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: cauchyProbabilities.t('varvals'),
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
                    label: cauchyProbabilities.t('location'),
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
                    label: cauchyProbabilities.t('scale'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: cauchyProbabilities.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: cauchyProbabilities.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: cauchyProbabilities.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.location.el.content, objects.scale.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: cauchyProbabilities.t('navigation'),
                icon: "icon-c-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: cauchyProbabilities.t('help.title'),
            r_help: "help(data,package='utils')",
            body: cauchyProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new cauchyProbabilities().render()
}

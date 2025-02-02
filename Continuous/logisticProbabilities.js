





class logisticProbabilities extends baseModal {
    static dialogId = 'logisticProbabilities'
    static t = baseModal.makeT(logisticProbabilities.dialogId)

    constructor() {
        var config = {
            id: logisticProbabilities.dialogId,
            label: logisticProbabilities.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result =  stats::plogis(c({{selected.varvals | safe}}), location={{selected.location | safe}}, scale={{selected.scale | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: logisticProbabilities.t('varvals'),
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
                    label: logisticProbabilities.t('location'),
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
                    label: logisticProbabilities.t('scale'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: logisticProbabilities.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: logisticProbabilities.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: logisticProbabilities.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.location.el.content, objects.scale.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: logisticProbabilities.t('navigation'),
                icon: "icon-logistic_white_comp-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: logisticProbabilities.t('help.title'),
            r_help: logisticProbabilities.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: logisticProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new logisticProbabilities().render()
}

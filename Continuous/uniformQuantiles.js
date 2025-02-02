





class uniformQuantiles extends baseModal {
    static dialogId = 'uniformQuantiles'
    static t = baseModal.makeT(uniformQuantiles.dialogId)

    constructor() {
        var config = {
            id: uniformQuantiles.dialogId,
            label: uniformQuantiles.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result =  stats::qunif(c({{selected.prob | safe}}), min={{selected.min | safe}}, max={{selected.max | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: uniformQuantiles.t('prob'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            min: {
                el: new input(config, {
                    no: 'min',
                    label: uniformQuantiles.t('min'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            max: {
                el: new input(config, {
                    no: 'max',
                    label: uniformQuantiles.t('max'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: uniformQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: uniformQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: uniformQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.prob.el.content, objects.min.el.content, objects.max.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: uniformQuantiles.t('navigation'),
                icon: "icon-rectangle-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: uniformQuantiles.t('help.title'),
            r_help: uniformQuantiles.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: uniformQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new uniformQuantiles().render()
}

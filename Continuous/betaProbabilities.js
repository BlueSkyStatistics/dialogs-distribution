


class betaProbabilities extends baseModal {
    static dialogId = 'betaProbabilities'
    static t = baseModal.makeT(betaProbabilities.dialogId)

    constructor() {
        var config = {
            id: betaProbabilities.dialogId,
            label: betaProbabilities.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::pbeta(c({{selected.varvals | safe}}), shape1={{selected.shape1 | safe}}, shape2={{selected.shape2 | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: betaProbabilities.t('varvals'),
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
                    label: betaProbabilities.t('shape1'),
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
                    label: betaProbabilities.t('shape2'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            labelSig: { el: new labelVar(config, { label: betaProbabilities.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: betaProbabilities.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: betaProbabilities.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.shape1.el.content, objects.shape2.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: betaProbabilities.t('navigation'),
                icon: "icon-beta_p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: betaProbabilities.t('help.title'),
            r_help: "help(data,package='utils')",
            body: betaProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new betaProbabilities().render()
}

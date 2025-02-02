





class fProbabilities extends baseModal {
    static dialogId = 'fProbabilities'
    static t = baseModal.makeT(fProbabilities.dialogId)

    constructor() {
        var config = {
            id: fProbabilities.dialogId,
            label: fProbabilities.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::pf(c({{selected.varvals | safe}}), df1={{selected.dfnumerator | safe}}, df2={{selected.dfdenominator | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: fProbabilities.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            dfnumerator: {
                el: new input(config, {
                    no: 'dfnumerator',
                    label: fProbabilities.t('dfnumerator'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            dfdenominator: {
                el: new input(config, {
                    no: 'dfdenominator',
                    label: fProbabilities.t('dfdenominator'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            labelSig: { el: new labelVar(config, { label: fProbabilities.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: fProbabilities.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: fProbabilities.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.dfnumerator.el.content, objects.dfdenominator.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: fProbabilities.t('navigation'),
                icon: "icon-f-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: fProbabilities.t('help.title'),
            r_help: fProbabilities.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: fProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new fProbabilities().render()
}

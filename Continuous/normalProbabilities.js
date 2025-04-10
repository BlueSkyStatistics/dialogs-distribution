/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class normalProbabilities extends baseModal {
    static dialogId = 'normalProbabilities'
    static t = baseModal.makeT(normalProbabilities.dialogId)

    constructor() {
        var config = {
            id: normalProbabilities.dialogId,
            label: normalProbabilities.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result =  stats::pnorm(c({{selected.varvals | safe}}), mean={{selected.mean | safe}}, sd={{selected.sd | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: normalProbabilities.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            mean: {
                el: new input(config, {
                    no: 'mean',
                    label: normalProbabilities.t('mean'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            sd: {
                el: new input(config, {
                    no: 'sd',
                    label: normalProbabilities.t('sd'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: normalProbabilities.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: normalProbabilities.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: normalProbabilities.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.mean.el.content, objects.sd.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: normalProbabilities.t('navigation'),
                icon: "icon-gaussian-function-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: normalProbabilities.t('help.title'),
            r_help: normalProbabilities.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: normalProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new normalProbabilities().render()
}

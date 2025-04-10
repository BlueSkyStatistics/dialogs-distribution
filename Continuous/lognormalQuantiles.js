/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class lognormalQuantiles extends baseModal {
    static dialogId = 'lognormalQuantiles'
    static t = baseModal.makeT(lognormalQuantiles.dialogId)

    constructor() {
        var config = {
            id: lognormalQuantiles.dialogId,
            label: lognormalQuantiles.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result =  stats::qlnorm(c({{selected.prob | safe}}), meanlog={{selected.meanlog | safe}}, sdlog={{selected.sdlog | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: lognormalQuantiles.t('prob'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            meanlog: {
                el: new input(config, {
                    no: 'meanlog',
                    label: lognormalQuantiles.t('meanlog'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            sdlog: {
                el: new input(config, {
                    no: 'sdlog',
                    label: lognormalQuantiles.t('sdlog'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: lognormalQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: lognormalQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: lognormalQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.prob.el.content, objects.meanlog.el.content, objects.sdlog.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: lognormalQuantiles.t('navigation'),
                icon: "icon-log-normal-distribution-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: lognormalQuantiles.t('help.title'),
            r_help: lognormalQuantiles.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: lognormalQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new lognormalQuantiles().render()
}

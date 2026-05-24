# Ansible style guide

A playbook failed because a `shell:` task said "install dependencies" and did six unrelated things. The failure was not Ansible's fault. The task had no contract.

The rule is simple: write [Ansible](https://docs.ansible.com/ansible/latest/) as declarative operations with small blast radii.

Then let [ansible-lint](https://ansible.readthedocs.io/projects/lint/) and [yamllint](https://yamllint.readthedocs.io/en/stable/) enforce the boring parts.

## Thesis

Ansible stays maintainable when every task names one desired state and uses the narrowest module that can enforce it.

## Installation

Last verified: 2026-05-24.

Use `pipx` for local CLI tools. It keeps Ansible out of the system Python environment.[^pipx]

```sh
python3 -m pip install --user pipx
python3 -m pipx ensurepath
pipx install --include-deps ansible
pipx install ansible-lint yamllint
ansible --version
ansible-lint --version
yamllint --version
```

Install collections from a pinned requirements file:

```sh
ansible-galaxy collection install -r requirements.yml
```

## Rules

Use YAML with 2 spaces. No tabs.

Every task has a `name`.

Task names describe the desired state, not the action:

```yaml
- name: Ensure nginx is installed
  ansible.builtin.package:
    name: nginx
    state: present
```

Prefer `ansible.builtin.*` modules over `command` and `shell`.

Use `ansible.builtin.command` when no module fits and shell features are not required.

Use `ansible.builtin.shell` only when pipes, redirects, globbing, or compound commands are the point.

Add `changed_when` and `failed_when` when Ansible cannot infer idempotence.

Use handlers for service restarts.

Keep secrets out of playbooks. Use [Ansible Vault](https://docs.ansible.com/ansible/latest/vault_guide/index.html), a CI secret store, or a platform secret manager.

Pin external collections in `requirements.yml`.

## Repository shape

```text
.
├── ansible.cfg
├── inventories
│   ├── production
│   └── staging
├── playbooks
│   └── site.yml
├── requirements.yml
└── roles
    └── example
        ├── defaults
        │   └── main.yml
        ├── handlers
        │   └── main.yml
        └── tasks
            └── main.yml
```

## Enforcement

Use `.ansible-lint` for Ansible-specific rules.

Use `.yamllint.yml` for YAML rules shared by inventories, playbooks, and CI files.

Run the same checks locally and in CI:

```sh
ansible-galaxy collection install -r requirements.yml
ansible-lint
yamllint .
ansible-playbook --syntax-check playbooks/site.yml
```

## Tradeoff

Ansible is a poor fit for long imperative workflows. If the playbook turns into a shell script with YAML indentation, write a script, test it, and call it deliberately.

## Closing

Good Ansible reads like an inventory of outcomes. Bad Ansible reads like a transcript of what happened on one machine, once.

## Change log for this rewrite

* Thesis identified: maintainability comes from one desired state per task and narrow modules.
* Claims dated: installation commands marked `Last verified: 2026-05-24`.
* Links added: Ansible, ansible-lint, yamllint, Ansible Vault.
* Tradeoff surfaced: shell-like playbooks should usually become scripts.
* Flagged but unchanged: collection versions stay in `requirements.yml`, not this README.

[^pipx]: Ansible's install guidance changes by platform. The durable rule is isolation; `pipx` is the local default here.

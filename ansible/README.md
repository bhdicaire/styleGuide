# Ansible style guide

## Rationale

Ansible is readable when it stays declarative. A playbook should explain the desired state, not perform a clever shell session one task at a time.

Use Ansible for repeatable system configuration, service deployment, and operational workflows. Do not use it as a general-purpose scripting language when a small shell script or purpose-built CLI would be clearer.

## Installation

Install Ansible with `pipx` so the CLI is isolated from the system Python environment. This follows the [official Ansible installation guide](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html).

```sh
python3 -m pip install --user pipx
python3 -m pipx ensurepath
pipx install --include-deps ansible
ansible --version
```

Install [ansible-lint](https://docs.ansible.com/projects/lint/en/latest/installing.html) separately:

```sh
pipx install ansible-lint
ansible-lint --version
```

Install [yamllint](https://yamllint.readthedocs.io/en/stable/) when the repository contains YAML outside Ansible content:

```sh
pipx install yamllint
yamllint --version
```

Install collections with [ansible-galaxy](https://docs.ansible.com/ansible/latest/collections_guide/collections_installing.html):

```sh
ansible-galaxy collection install -r requirements.yml
```

## Rules

Use YAML with 2-space indentation and no tabs.

Use fully qualified collection names when the module is not from `ansible.builtin`:

```yaml
- name: Install nginx
  ansible.builtin.package:
    name: nginx
    state: present
```

Every task needs a `name`.

Task names should describe the desired outcome:

```yaml
- name: Ensure nginx is installed
```

Prefer modules over `ansible.builtin.command` or `ansible.builtin.shell`.

Use `ansible.builtin.command` when no module fits and shell features are not needed.

Use `ansible.builtin.shell` only when shell features such as pipes, redirects, globbing, or compound commands are required.

Add `changed_when` and `failed_when` when Ansible cannot infer idempotence correctly.

Prefer handlers for service restarts.

Prefer role defaults for overrideable values.

Keep secrets out of playbooks. Use Ansible Vault, environment-specific secret stores, or CI secrets.

Pin external collections in `requirements.yml`.

Keep inventories separate from reusable roles.

## Repository layout

Use this layout for most repositories:

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

## Tooling

Use [ansible-lint](https://ansible.readthedocs.io/projects/lint/) for Ansible-specific rules.

Use [yamllint](https://yamllint.readthedocs.io/en/stable/) for general YAML formatting and readability.

Use [pre-commit](https://pre-commit.com/) when a team wants checks to run before commits.

## Files

- `.ansible-lint`: ansible-lint configuration.
- `.yamllint.yml`: YAML style rules.
- `ansible.cfg`: safe local defaults for a project.
- `requirements.yml`: example pinned collection dependencies.

## Local checks

```sh
ansible-galaxy collection install -r requirements.yml
ansible-lint
yamllint .
ansible-playbook --syntax-check playbooks/site.yml
```
